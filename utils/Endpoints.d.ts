declare const Endpoints: Readonly<{
    guard: (value: string) => value is "Activities" | "ActivitySplits" | "Steps" | "HeartRate" | "SleepData";
    check: (value: string) => "Activities" | "ActivitySplits" | "Steps" | "HeartRate" | "SleepData";
    values: ("Activities" | "ActivitySplits" | "Steps" | "HeartRate" | "SleepData")[];
} & {
    type: "Activities" | "ActivitySplits" | "Steps" | "HeartRate" | "SleepData";
}>;
declare type Endpoints = typeof Endpoints.type;
export default Endpoints;
//# sourceMappingURL=Endpoints.d.ts.map