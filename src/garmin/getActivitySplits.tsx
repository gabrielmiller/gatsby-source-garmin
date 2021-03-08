import compareAsc from "date-fns/compareAsc";
import { GarminConnect } from "garmin-connect";
import { GatsbyCache, PluginOptions, Reporter } from "gatsby";
import GarminPluginOptions from "../utils/GarminPluginOptions";
import Sleep from "../utils/Sleep";

export const getActivitySplits = async ({
  cache,
  pluginOptions,
  reporter,
  GCClient,
}: {
  cache: GatsbyCache;
  pluginOptions: PluginOptions & GarminPluginOptions;
  reporter: Reporter;
  GCClient: GarminConnect;
}): Promise<any[]> => {
  try {
    const activitySplits = [];

    let cachedActivitySplitIds = (await cache.get("GarminActivititySplits")) || [];

    if (cachedActivitySplitIds.length > 0) {
      cachedActivitySplitIds.forEach(async (activityId: string) => {
        const cachedActivitySplit = await cache.get(`GarminActivitySplit${activityId}`);
        activitySplits.push(cachedActivitySplit);
      });

      if (pluginOptions.debug!) {
        reporter.info(
          `source-garmin: ${cachedActivitySplitIds.length} activity splits restored from cache`
        );
      }
    }

    // set start date based on last fetch date
    let startDate = new Date(pluginOptions.startDate);
    const lastFetch = await cache.get("GarminActivitySplitsLastFetch");
    if (lastFetch !== undefined) {
      let lastFetchDate = new Date(lastFetch);
      // start date before last fetch date
      if (compareAsc(startDate, lastFetchDate) === -1) {
        startDate = lastFetchDate;
      }
    }

    let cachedActivitiesIds = (await cache.get("GarminActivities")) || [];
    // Diff the cached activity ids with the cached activity split ids
    // For each activity that exists without a matching activity, make a request
    // for its splits. Cache them.

    // todo: find out if garmin returns a 2xx response when requesting
    // splits for any type of activity
    let activitiesIdsThatNeedSplits = [];

    for (const activityId of cachedActivitiesIds) {
      if (cachedActivitySplitIds.indexOf(activityId) !== -1) {
        continue;
      }

      activitiesIdsThatNeedSplits.push(activityId);
    }

    if (pluginOptions.debug) {
      reporter.info(
        "source-garmin: Fetching activity splits since " + startDate.toLocaleString()
      );
    }

    for (const activityId of activitiesIdsThatNeedSplits) {
      let splits = await GCClient.getActivitySplits(activityId);

      await cache.set(`GarminActivitySplit${splits.activityId}`, splits);

      activitySplits.push(splits);

      await Sleep(2000);
    }

    if (pluginOptions.debug) {
      reporter.info(
        `source-garmin: ${activitiesIdsThatNeedSplits.length} activities' splits were loaded from garmin`
      );
    }

    await cache.set(
      `GarminActivitySplits`,
      activitySplits.map((a) => a.activityId)
    );

    await cache.set("GarminActivitySplitsLastFetch", Date.now());
    return activitySplits;
  } catch (e) {
    if (pluginOptions.debug) {
      reporter.panic(`source-garmin: `, e);
    } else {
      reporter.panic(`source-garmin: ${e.message}`);
    }
    return [];
  }
};
