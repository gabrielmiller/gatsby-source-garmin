"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivitySplits = void 0;
var compareAsc_1 = __importDefault(require("date-fns/compareAsc"));
var Sleep_1 = __importDefault(require("../utils/Sleep"));
var getActivitySplits = function (_a) {
    var cache = _a.cache, pluginOptions = _a.pluginOptions, reporter = _a.reporter, GCClient = _a.GCClient;
    return __awaiter(void 0, void 0, void 0, function () {
        var activitySplits_1, cachedActivitySplitIds, startDate, lastFetch, lastFetchDate, cachedActivitiesIds, activitiesIdsThatNeedSplits, _i, cachedActivitiesIds_1, activityId, _b, activitiesIdsThatNeedSplits_1, activityId, splits, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 12, , 13]);
                    activitySplits_1 = [];
                    return [4 /*yield*/, cache.get("GarminActivititySplits")];
                case 1:
                    cachedActivitySplitIds = (_c.sent()) || [];
                    if (cachedActivitySplitIds.length > 0) {
                        cachedActivitySplitIds.forEach(function (activityId) { return __awaiter(void 0, void 0, void 0, function () {
                            var cachedActivitySplit;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, cache.get("GarminActivitySplit" + activityId)];
                                    case 1:
                                        cachedActivitySplit = _a.sent();
                                        activitySplits_1.push(cachedActivitySplit);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        if (pluginOptions.debug) {
                            reporter.info("source-garmin: " + cachedActivitySplitIds.length + " activity splits restored from cache");
                        }
                    }
                    startDate = new Date(pluginOptions.startDate);
                    return [4 /*yield*/, cache.get("GarminActivitySplitsLastFetch")];
                case 2:
                    lastFetch = _c.sent();
                    if (lastFetch !== undefined) {
                        lastFetchDate = new Date(lastFetch);
                        // start date before last fetch date
                        if (compareAsc_1.default(startDate, lastFetchDate) === -1) {
                            startDate = lastFetchDate;
                        }
                    }
                    return [4 /*yield*/, cache.get("GarminActivities")];
                case 3:
                    cachedActivitiesIds = (_c.sent()) || [];
                    activitiesIdsThatNeedSplits = [];
                    for (_i = 0, cachedActivitiesIds_1 = cachedActivitiesIds; _i < cachedActivitiesIds_1.length; _i++) {
                        activityId = cachedActivitiesIds_1[_i];
                        if (cachedActivitySplitIds.indexOf(activityId) !== -1) {
                            continue;
                        }
                        activitiesIdsThatNeedSplits.push(activityId);
                    }
                    if (pluginOptions.debug) {
                        reporter.info("source-garmin: Fetching activity splits since " + startDate.toLocaleString());
                    }
                    _b = 0, activitiesIdsThatNeedSplits_1 = activitiesIdsThatNeedSplits;
                    _c.label = 4;
                case 4:
                    if (!(_b < activitiesIdsThatNeedSplits_1.length)) return [3 /*break*/, 9];
                    activityId = activitiesIdsThatNeedSplits_1[_b];
                    return [4 /*yield*/, GCClient.getActivitySplits(activityId)];
                case 5:
                    splits = _c.sent();
                    return [4 /*yield*/, cache.set("GarminActivitySplit" + splits.activityId, splits)];
                case 6:
                    _c.sent();
                    activitySplits_1.push(splits);
                    return [4 /*yield*/, Sleep_1.default(2000)];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    _b++;
                    return [3 /*break*/, 4];
                case 9:
                    if (pluginOptions.debug) {
                        reporter.info("source-garmin: " + activitiesIdsThatNeedSplits.length + " activities' splits were loaded from garmin");
                    }
                    return [4 /*yield*/, cache.set("GarminActivitySplits", activitySplits_1.map(function (a) { return a.activityId; }))];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, cache.set("GarminActivitySplitsLastFetch", Date.now())];
                case 11:
                    _c.sent();
                    return [2 /*return*/, activitySplits_1];
                case 12:
                    e_1 = _c.sent();
                    if (pluginOptions.debug) {
                        reporter.panic("source-garmin: ", e_1);
                    }
                    else {
                        reporter.panic("source-garmin: " + e_1.message);
                    }
                    return [2 /*return*/, []];
                case 13: return [2 /*return*/];
            }
        });
    });
};
exports.getActivitySplits = getActivitySplits;
//# sourceMappingURL=getActivitySplits.js.map