import { readFile } from "node:fs/promises";
import path from "node:path";
import { markdownStructure, translationReadinessFailures } from "./translation-registry.mjs";
import { localizeSourceExamples } from "./source-code-tabs.mjs";

const contentRatios = {
  vi: 0.6,
  ko: 0.5
};
const reviewRanks = {
  pending: 0,
  "self-reviewed": 1,
  "independently-reviewed": 2
};

export async function createTranslationParityReport({ projectRoot, manifest }) {
  const minimumContentRatio = contentRatios[manifest.targetLanguage] ?? 0.6;
  const documents = [];

  for (const document of manifest.documents) {
    const [sourceMarkdown, targetMarkdown] = await Promise.all([
      readFile(path.join(projectRoot, document.source), "utf8"),
      readFile(path.join(projectRoot, document.target), "utf8")
    ]);
    const localizedExamples = await localizeSourceExamples({
      projectRoot,
      sourcePath: document.source,
      sourceMarkdown,
      targetMarkdown,
      locale: manifest.targetLanguage
    });
    const effectiveTargetMarkdown = localizedExamples.markdown;
    const source = markdownStructure(sourceMarkdown);
    const target = markdownStructure(effectiveTargetMarkdown);
    const failures = translationReadinessFailures(sourceMarkdown, effectiveTargetMarkdown, minimumContentRatio);
    const reviews = document.reviews || manifest.qualityPolicy.defaultReviewState;
    const reviewReady = reviewRanks[reviews.technical] >= reviewRanks["self-reviewed"] &&
      reviewRanks[reviews.language] >= reviewRanks["self-reviewed"];
    documents.push({
      source: document.source,
      target: document.target,
      route: document.route,
      status: document.status,
      wave: document.wave,
      sourceMetrics: source,
      targetMetrics: target,
      officialCodeGroups: {
        source: localizedExamples.sourceGroups,
        inline: localizedExamples.inlineGroups,
        deferred: localizedExamples.deferredGroups,
        preserved: localizedExamples.inlineGroups + localizedExamples.deferredGroups === localizedExamples.sourceGroups
      },
      proseCoverageRatio: source.proseCharacters === 0
        ? 1
        : Number((target.proseCharacters / source.proseCharacters).toFixed(3)),
      structuralParity: failures.length === 0,
      reviews,
      eligibleForPilot: failures.length === 0 && reviewReady,
      failures
    });
  }

  const structurallyReady = documents.filter((document) => document.structuralParity).length;
  return {
    schemaVersion: 1,
    generatedAt: manifest.updated,
    sourceCommit: manifest.sourceCommit,
    sourceLanguage: manifest.sourceLanguage,
    targetLanguage: manifest.targetLanguage,
    minimumContentRatio,
    summary: {
      total: documents.length,
      structurallyReady,
      needsWork: documents.length - structurallyReady,
      pilotEligible: documents.filter((document) => document.eligibleForPilot).length
    },
    documents
  };
}
