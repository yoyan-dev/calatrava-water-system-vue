import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Billing_Key {
  id: UUIDString;
  __typename?: 'Billing_Key';
}

export interface Book_Key {
  id: UUIDString;
  __typename?: 'Book_Key';
}

export interface InsertBillingData {
  billing_insert: Billing_Key;
}

export interface InsertBillingVariables {
  data: {
    id?: UUIDString | null;
    id_expr?: {
    };
      residentId?: UUIDString | null;
      residentId_expr?: {
      };
        resident?: Resident_Key | null;
        amortAmt?: number | null;
        amortAmt_expr?: {
        };
          amortAmt_update?: ({
            inc?: number | null;
            dec?: number | null;
          })[];
            arrearsAmt?: number | null;
            arrearsAmt_expr?: {
            };
              arrearsAmt_update?: ({
                inc?: number | null;
                dec?: number | null;
              })[];
                arrearsEnv?: number | null;
                arrearsEnv_expr?: {
                };
                  arrearsEnv_update?: ({
                    inc?: number | null;
                    dec?: number | null;
                  })[];
                    bStatus?: string | null;
                    bStatus_expr?: {
                    };
                      billAmt?: number | null;
                      billAmt_expr?: {
                      };
                        billAmt_update?: ({
                          inc?: number | null;
                          dec?: number | null;
                        })[];
                          billBrgy?: string | null;
                          billBrgy_expr?: {
                          };
                            billDate?: DateString | null;
                            billDate_expr?: {
                            };
                              billDate_date?: {
                                today?: {
                                };
                                  on?: DateString | null;
                                  add?: {
                                    days?: number;
                                    weeks?: number;
                                    months?: number;
                                    years?: number;
                                  };
                                    sub?: {
                                      days?: number;
                                      weeks?: number;
                                      months?: number;
                                      years?: number;
                                    };
                                      truncateTo?: Date_Interval | null;
                              };
                                billDate_update?: ({
                                  inc?: {
                                    days?: number;
                                    weeks?: number;
                                    months?: number;
                                    years?: number;
                                  };
                                    dec?: {
                                      days?: number;
                                      weeks?: number;
                                      months?: number;
                                      years?: number;
                                    };
                                })[];
                                  billNo?: number | null;
                                  billNo_expr?: {
                                  };
                                    billNo_update?: ({
                                      inc?: number | null;
                                      dec?: number | null;
                                    })[];
                                      billPurok?: string | null;
                                      billPurok_expr?: {
                                      };
                                        createdAt?: TimestampString | null;
                                        createdAt_expr?: {
                                        };
                                          createdAt_time?: {
                                            now?: {
                                            };
                                              at?: TimestampString | null;
                                              add?: {
                                                milliseconds?: number;
                                                seconds?: number;
                                                minutes?: number;
                                                hours?: number;
                                                days?: number;
                                                weeks?: number;
                                                months?: number;
                                                years?: number;
                                              };
                                                sub?: {
                                                  milliseconds?: number;
                                                  seconds?: number;
                                                  minutes?: number;
                                                  hours?: number;
                                                  days?: number;
                                                  weeks?: number;
                                                  months?: number;
                                                  years?: number;
                                                };
                                                  truncateTo?: Timestamp_Interval | null;
                                          };
                                            createdAt_update?: ({
                                              inc?: {
                                                milliseconds?: number;
                                                seconds?: number;
                                                minutes?: number;
                                                hours?: number;
                                                days?: number;
                                                weeks?: number;
                                                months?: number;
                                                years?: number;
                                              };
                                                dec?: {
                                                  milliseconds?: number;
                                                  seconds?: number;
                                                  minutes?: number;
                                                  hours?: number;
                                                  days?: number;
                                                  weeks?: number;
                                                  months?: number;
                                                  years?: number;
                                                };
                                            })[];
                                              curReading?: number | null;
                                              curReading_expr?: {
                                              };
                                                curReading_update?: ({
                                                  inc?: number | null;
                                                  dec?: number | null;
                                                })[];
                                                  disconDate?: DateString | null;
                                                  disconDate_expr?: {
                                                  };
                                                    disconDate_date?: {
                                                      today?: {
                                                      };
                                                        on?: DateString | null;
                                                        add?: {
                                                          days?: number;
                                                          weeks?: number;
                                                          months?: number;
                                                          years?: number;
                                                        };
                                                          sub?: {
                                                            days?: number;
                                                            weeks?: number;
                                                            months?: number;
                                                            years?: number;
                                                          };
                                                            truncateTo?: Date_Interval | null;
                                                    };
                                                      disconDate_update?: ({
                                                        inc?: {
                                                          days?: number;
                                                          weeks?: number;
                                                          months?: number;
                                                          years?: number;
                                                        };
                                                          dec?: {
                                                            days?: number;
                                                            weeks?: number;
                                                            months?: number;
                                                            years?: number;
                                                          };
                                                      })[];
                                                        discount?: number | null;
                                                        discount_expr?: {
                                                        };
                                                          discount_update?: ({
                                                            inc?: number | null;
                                                            dec?: number | null;
                                                          })[];
                                                            dueDate?: DateString | null;
                                                            dueDate_expr?: {
                                                            };
                                                              dueDate_date?: {
                                                                today?: {
                                                                };
                                                                  on?: DateString | null;
                                                                  add?: {
                                                                    days?: number;
                                                                    weeks?: number;
                                                                    months?: number;
                                                                    years?: number;
                                                                  };
                                                                    sub?: {
                                                                      days?: number;
                                                                      weeks?: number;
                                                                      months?: number;
                                                                      years?: number;
                                                                    };
                                                                      truncateTo?: Date_Interval | null;
                                                              };
                                                                dueDate_update?: ({
                                                                  inc?: {
                                                                    days?: number;
                                                                    weeks?: number;
                                                                    months?: number;
                                                                    years?: number;
                                                                  };
                                                                    dec?: {
                                                                      days?: number;
                                                                      weeks?: number;
                                                                      months?: number;
                                                                      years?: number;
                                                                    };
                                                                })[];
                                                                  duePenalty?: number | null;
                                                                  duePenalty_expr?: {
                                                                  };
                                                                    duePenalty_update?: ({
                                                                      inc?: number | null;
                                                                      dec?: number | null;
                                                                    })[];
                                                                      environmentFee?: number | null;
                                                                      environmentFee_expr?: {
                                                                      };
                                                                        environmentFee_update?: ({
                                                                          inc?: number | null;
                                                                          dec?: number | null;
                                                                        })[];
                                                                          mPenalty?: number | null;
                                                                          mPenalty_expr?: {
                                                                          };
                                                                            mPenalty_update?: ({
                                                                              inc?: number | null;
                                                                              dec?: number | null;
                                                                            })[];
                                                                              mrSysNo?: number | null;
                                                                              mrSysNo_expr?: {
                                                                              };
                                                                                mrSysNo_update?: ({
                                                                                  inc?: number | null;
                                                                                  dec?: number | null;
                                                                                })[];
                                                                                  mrrfDue?: number | null;
                                                                                  mrrfDue_expr?: {
                                                                                  };
                                                                                    mrrfDue_update?: ({
                                                                                      inc?: number | null;
                                                                                      dec?: number | null;
                                                                                    })[];
                                                                                      mtrNo?: string | null;
                                                                                      mtrNo_expr?: {
                                                                                      };
                                                                                        nrWater?: number | null;
                                                                                        nrWater_expr?: {
                                                                                        };
                                                                                          nrWater_update?: ({
                                                                                            inc?: number | null;
                                                                                            dec?: number | null;
                                                                                          })[];
                                                                                            paid?: string | null;
                                                                                            paid_expr?: {
                                                                                            };
                                                                                              paymentDate?: TimestampString | null;
                                                                                              paymentDate_expr?: {
                                                                                              };
                                                                                                paymentDate_time?: {
                                                                                                  now?: {
                                                                                                  };
                                                                                                    at?: TimestampString | null;
                                                                                                    add?: {
                                                                                                      milliseconds?: number;
                                                                                                      seconds?: number;
                                                                                                      minutes?: number;
                                                                                                      hours?: number;
                                                                                                      days?: number;
                                                                                                      weeks?: number;
                                                                                                      months?: number;
                                                                                                      years?: number;
                                                                                                    };
                                                                                                      sub?: {
                                                                                                        milliseconds?: number;
                                                                                                        seconds?: number;
                                                                                                        minutes?: number;
                                                                                                        hours?: number;
                                                                                                        days?: number;
                                                                                                        weeks?: number;
                                                                                                        months?: number;
                                                                                                        years?: number;
                                                                                                      };
                                                                                                        truncateTo?: Timestamp_Interval | null;
                                                                                                };
                                                                                                  paymentDate_update?: ({
                                                                                                    inc?: {
                                                                                                      milliseconds?: number;
                                                                                                      seconds?: number;
                                                                                                      minutes?: number;
                                                                                                      hours?: number;
                                                                                                      days?: number;
                                                                                                      weeks?: number;
                                                                                                      months?: number;
                                                                                                      years?: number;
                                                                                                    };
                                                                                                      dec?: {
                                                                                                        milliseconds?: number;
                                                                                                        seconds?: number;
                                                                                                        minutes?: number;
                                                                                                        hours?: number;
                                                                                                        days?: number;
                                                                                                        weeks?: number;
                                                                                                        months?: number;
                                                                                                        years?: number;
                                                                                                      };
                                                                                                  })[];
                                                                                                    paymentReceipt?: string | null;
                                                                                                    paymentReceipt_expr?: {
                                                                                                    };
                                                                                                      paymentStatus?: string | null;
                                                                                                      paymentStatus_expr?: {
                                                                                                      };
                                                                                                        penalized?: string | null;
                                                                                                        penalized_expr?: {
                                                                                                        };
                                                                                                          preReading?: number | null;
                                                                                                          preReading_expr?: {
                                                                                                          };
                                                                                                            preReading_update?: ({
                                                                                                              inc?: number | null;
                                                                                                              dec?: number | null;
                                                                                                            })[];
                                                                                                              prevUsed?: number | null;
                                                                                                              prevUsed_expr?: {
                                                                                                              };
                                                                                                                prevUsed_update?: ({
                                                                                                                  inc?: number | null;
                                                                                                                  dec?: number | null;
                                                                                                                })[];
                                                                                                                  prevUsed2?: number | null;
                                                                                                                  prevUsed2_expr?: {
                                                                                                                  };
                                                                                                                    prevUsed2_update?: ({
                                                                                                                      inc?: number | null;
                                                                                                                      dec?: number | null;
                                                                                                                    })[];
                                                                                                                      prvBillDate?: string | null;
                                                                                                                      prvBillDate_expr?: {
                                                                                                                      };
                                                                                                                        prvDiscon?: string | null;
                                                                                                                        prvDiscon_expr?: {
                                                                                                                        };
                                                                                                                          prvDueDate?: string | null;
                                                                                                                          prvDueDate_expr?: {
                                                                                                                          };
                                                                                                                            purokCode?: string | null;
                                                                                                                            purokCode_expr?: {
                                                                                                                            };
                                                                                                                              stubOut?: string | null;
                                                                                                                              stubOut_expr?: {
                                                                                                                              };
                                                                                                                                totalBill?: number | null;
                                                                                                                                totalBill_expr?: {
                                                                                                                                };
                                                                                                                                  totalBill_update?: ({
                                                                                                                                    inc?: number | null;
                                                                                                                                    dec?: number | null;
                                                                                                                                  })[];
                                                                                                                                    updatedAt?: TimestampString | null;
                                                                                                                                    updatedAt_expr?: {
                                                                                                                                    };
                                                                                                                                      updatedAt_time?: {
                                                                                                                                        now?: {
                                                                                                                                        };
                                                                                                                                          at?: TimestampString | null;
                                                                                                                                          add?: {
                                                                                                                                            milliseconds?: number;
                                                                                                                                            seconds?: number;
                                                                                                                                            minutes?: number;
                                                                                                                                            hours?: number;
                                                                                                                                            days?: number;
                                                                                                                                            weeks?: number;
                                                                                                                                            months?: number;
                                                                                                                                            years?: number;
                                                                                                                                          };
                                                                                                                                            sub?: {
                                                                                                                                              milliseconds?: number;
                                                                                                                                              seconds?: number;
                                                                                                                                              minutes?: number;
                                                                                                                                              hours?: number;
                                                                                                                                              days?: number;
                                                                                                                                              weeks?: number;
                                                                                                                                              months?: number;
                                                                                                                                              years?: number;
                                                                                                                                            };
                                                                                                                                              truncateTo?: Timestamp_Interval | null;
                                                                                                                                      };
                                                                                                                                        updatedAt_update?: ({
                                                                                                                                          inc?: {
                                                                                                                                            milliseconds?: number;
                                                                                                                                            seconds?: number;
                                                                                                                                            minutes?: number;
                                                                                                                                            hours?: number;
                                                                                                                                            days?: number;
                                                                                                                                            weeks?: number;
                                                                                                                                            months?: number;
                                                                                                                                            years?: number;
                                                                                                                                          };
                                                                                                                                            dec?: {
                                                                                                                                              milliseconds?: number;
                                                                                                                                              seconds?: number;
                                                                                                                                              minutes?: number;
                                                                                                                                              hours?: number;
                                                                                                                                              days?: number;
                                                                                                                                              weeks?: number;
                                                                                                                                              months?: number;
                                                                                                                                              years?: number;
                                                                                                                                            };
                                                                                                                                        })[];
                                                                                                                                          verified?: string | null;
                                                                                                                                          verified_expr?: {
                                                                                                                                          };
                                                                                                                                            waterUsage?: number | null;
                                                                                                                                            waterUsage_expr?: {
                                                                                                                                            };
                                                                                                                                              waterUsage_update?: ({
                                                                                                                                                inc?: number | null;
                                                                                                                                                dec?: number | null;
                                                                                                                                              })[];
  };
}

export interface InsertBookData {
  book_insert: Book_Key;
}

export interface InsertBookVariables {
  data: {
    id?: UUIDString | null;
    id_expr?: {
    };
      code?: string | null;
      code_expr?: {
      };
        createdAt?: TimestampString | null;
        createdAt_expr?: {
        };
          createdAt_time?: {
            now?: {
            };
              at?: TimestampString | null;
              add?: {
                milliseconds?: number;
                seconds?: number;
                minutes?: number;
                hours?: number;
                days?: number;
                weeks?: number;
                months?: number;
                years?: number;
              };
                sub?: {
                  milliseconds?: number;
                  seconds?: number;
                  minutes?: number;
                  hours?: number;
                  days?: number;
                  weeks?: number;
                  months?: number;
                  years?: number;
                };
                  truncateTo?: Timestamp_Interval | null;
          };
            createdAt_update?: ({
              inc?: {
                milliseconds?: number;
                seconds?: number;
                minutes?: number;
                hours?: number;
                days?: number;
                weeks?: number;
                months?: number;
                years?: number;
              };
                dec?: {
                  milliseconds?: number;
                  seconds?: number;
                  minutes?: number;
                  hours?: number;
                  days?: number;
                  weeks?: number;
                  months?: number;
                  years?: number;
                };
            })[];
              updatedAt?: TimestampString | null;
              updatedAt_expr?: {
              };
                updatedAt_time?: {
                  now?: {
                  };
                    at?: TimestampString | null;
                    add?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                      sub?: {
                        milliseconds?: number;
                        seconds?: number;
                        minutes?: number;
                        hours?: number;
                        days?: number;
                        weeks?: number;
                        months?: number;
                        years?: number;
                      };
                        truncateTo?: Timestamp_Interval | null;
                };
                  updatedAt_update?: ({
                    inc?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                      dec?: {
                        milliseconds?: number;
                        seconds?: number;
                        minutes?: number;
                        hours?: number;
                        days?: number;
                        weeks?: number;
                        months?: number;
                        years?: number;
                      };
                  })[];
  };
}

export interface InsertResidentData {
  resident_insert: Resident_Key;
}

export interface InsertResidentVariables {
  data: {
    id?: UUIDString | null;
    id_expr?: {
    };
      bookId?: UUIDString | null;
      bookId_expr?: {
      };
        book?: Book_Key | null;
        accountNo?: number | null;
        accountNo_expr?: {
        };
          accountNo_update?: ({
            inc?: number | null;
            dec?: number | null;
          })[];
            classType?: string | null;
            classType_expr?: {
            };
              createdAt?: TimestampString | null;
              createdAt_expr?: {
              };
                createdAt_time?: {
                  now?: {
                  };
                    at?: TimestampString | null;
                    add?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                      sub?: {
                        milliseconds?: number;
                        seconds?: number;
                        minutes?: number;
                        hours?: number;
                        days?: number;
                        weeks?: number;
                        months?: number;
                        years?: number;
                      };
                        truncateTo?: Timestamp_Interval | null;
                };
                  createdAt_update?: ({
                    inc?: {
                      milliseconds?: number;
                      seconds?: number;
                      minutes?: number;
                      hours?: number;
                      days?: number;
                      weeks?: number;
                      months?: number;
                      years?: number;
                    };
                      dec?: {
                        milliseconds?: number;
                        seconds?: number;
                        minutes?: number;
                        hours?: number;
                        days?: number;
                        weeks?: number;
                        months?: number;
                        years?: number;
                      };
                  })[];
                    fullName?: string | null;
                    fullName_expr?: {
                    };
                      updatedAt?: TimestampString | null;
                      updatedAt_expr?: {
                      };
                        updatedAt_time?: {
                          now?: {
                          };
                            at?: TimestampString | null;
                            add?: {
                              milliseconds?: number;
                              seconds?: number;
                              minutes?: number;
                              hours?: number;
                              days?: number;
                              weeks?: number;
                              months?: number;
                              years?: number;
                            };
                              sub?: {
                                milliseconds?: number;
                                seconds?: number;
                                minutes?: number;
                                hours?: number;
                                days?: number;
                                weeks?: number;
                                months?: number;
                                years?: number;
                              };
                                truncateTo?: Timestamp_Interval | null;
                        };
                          updatedAt_update?: ({
                            inc?: {
                              milliseconds?: number;
                              seconds?: number;
                              minutes?: number;
                              hours?: number;
                              days?: number;
                              weeks?: number;
                              months?: number;
                              years?: number;
                            };
                              dec?: {
                                milliseconds?: number;
                                seconds?: number;
                                minutes?: number;
                                hours?: number;
                                days?: number;
                                weeks?: number;
                                months?: number;
                                years?: number;
                              };
                          })[];
  };
}

export interface PaginatedBillingsData {
  billings: ({
    id: UUIDString;
    billNo: number;
    billDate: DateString;
    dueDate: DateString;
    bStatus: string;
    mrSysNo: number;
    penalized: string;
    mPenalty: number;
    discount: number;
    paid: string;
    verified: string;
    arrearsAmt: number;
    mrrfDue: number;
    curReading: number;
    disconDate?: DateString | null;
    mtrNo: string;
    preReading: number;
    purokCode: string;
    billPurok: string;
    billBrgy: string;
    prevUsed: number;
    prevUsed2: number;
    prvBillDate: string;
    prvDueDate: string;
    prvDiscon: string;
    stubOut: string;
    amortAmt: number;
    nrWater: number;
    resident: {
      id: UUIDString;
      accountNo: number;
      fullName: string;
      classType: string;
      book: {
        code: string;
      };
    } & Resident_Key;
      billAmt: number;
      duePenalty: number;
      arrearsEnv: number;
      environmentFee: number;
      totalBill: number;
      waterUsage: number;
      paymentReceipt?: string | null;
      paymentStatus?: string | null;
      paymentDate?: TimestampString | null;
      createdAt: TimestampString;
      updatedAt: TimestampString;
  } & Billing_Key)[];
}

export interface PaginatedBillingsVariables {
  limit?: number | null;
  offset?: number | null;
}

export interface Resident_Key {
  id: UUIDString;
  __typename?: 'Resident_Key';
}

interface InsertBookRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertBookVariables): MutationRef<InsertBookData, InsertBookVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertBookVariables): MutationRef<InsertBookData, InsertBookVariables>;
  operationName: string;
}
export const insertBookRef: InsertBookRef;

export function insertBook(vars: InsertBookVariables): MutationPromise<InsertBookData, InsertBookVariables>;
export function insertBook(dc: DataConnect, vars: InsertBookVariables): MutationPromise<InsertBookData, InsertBookVariables>;

interface InsertResidentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertResidentVariables): MutationRef<InsertResidentData, InsertResidentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertResidentVariables): MutationRef<InsertResidentData, InsertResidentVariables>;
  operationName: string;
}
export const insertResidentRef: InsertResidentRef;

export function insertResident(vars: InsertResidentVariables): MutationPromise<InsertResidentData, InsertResidentVariables>;
export function insertResident(dc: DataConnect, vars: InsertResidentVariables): MutationPromise<InsertResidentData, InsertResidentVariables>;

interface InsertBillingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertBillingVariables): MutationRef<InsertBillingData, InsertBillingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertBillingVariables): MutationRef<InsertBillingData, InsertBillingVariables>;
  operationName: string;
}
export const insertBillingRef: InsertBillingRef;

export function insertBilling(vars: InsertBillingVariables): MutationPromise<InsertBillingData, InsertBillingVariables>;
export function insertBilling(dc: DataConnect, vars: InsertBillingVariables): MutationPromise<InsertBillingData, InsertBillingVariables>;

interface PaginatedBillingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: PaginatedBillingsVariables): QueryRef<PaginatedBillingsData, PaginatedBillingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: PaginatedBillingsVariables): QueryRef<PaginatedBillingsData, PaginatedBillingsVariables>;
  operationName: string;
}
export const paginatedBillingsRef: PaginatedBillingsRef;

export function paginatedBillings(vars?: PaginatedBillingsVariables): QueryPromise<PaginatedBillingsData, PaginatedBillingsVariables>;
export function paginatedBillings(dc: DataConnect, vars?: PaginatedBillingsVariables): QueryPromise<PaginatedBillingsData, PaginatedBillingsVariables>;

