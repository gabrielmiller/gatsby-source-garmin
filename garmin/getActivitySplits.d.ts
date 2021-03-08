import { GarminConnect } from "garmin-connect";
import { GatsbyCache, PluginOptions, Reporter } from "gatsby";
import GarminPluginOptions from "../utils/GarminPluginOptions";
export declare const getActivitySplits: ({ cache, pluginOptions, reporter, GCClient, }: {
    cache: GatsbyCache;
    pluginOptions: PluginOptions & GarminPluginOptions;
    reporter: Reporter;
    GCClient: GarminConnect;
}) => Promise<any[]>;
//# sourceMappingURL=getActivitySplits.d.ts.map