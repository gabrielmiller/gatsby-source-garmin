import { StringUnion } from "./StringUnion";

const Endpoints = StringUnion("Activities", "ActivitySplits", "Steps", "HeartRate", "SleepData");
type Endpoints = typeof Endpoints.type;

export default Endpoints;
