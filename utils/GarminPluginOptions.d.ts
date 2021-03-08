import Endpoints from "./Endpoints";
export default interface GarminPluginOptions {
    email: string;
    password: string;
    startDate: number;
    endpoints?: Endpoints[];
    debug?: boolean;
}
export declare const defaultGarminPluginOptions: {
    endpoints: ("Activities" | "ActivitySplits" | "Steps" | "HeartRate" | "SleepData")[];
    debug: boolean;
};
//# sourceMappingURL=GarminPluginOptions.d.ts.map