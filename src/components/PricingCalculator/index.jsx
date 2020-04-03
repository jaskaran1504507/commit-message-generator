/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import { Radio, Button, InputNumber } from "antd";
import styles from "./index.less";
import { setNumberDecimal } from "../../utils/utils";

const PricingCalculator = props => {
  const [fields, setFields] = useState({
    cost: 0,
    revenue: 0,
    margin: 0,
    profit: 0
  });
  const [type, setType] = useState("cost");
  const { cost, revenue, margin, profit } = fields;
  const { precision } = props;
  useEffect(() => {
    setFields({
      cost: setNumberDecimal(props.fields.cost || 0, precision),
      revenue: setNumberDecimal(props.fields.revenue || 0, precision),
      profit: setNumberDecimal(
        props.fields.revenue - props.fields.cost,
        precision
      ),
      margin: setNumberDecimal(
        props.fields.revenue
          ? ((props.fields.revenue - props.fields.cost) /
              props.fields.revenue) *
              100
          : 0,
        precision
      )
    });
    return () => {
      setFields({ cost: 0, revenue: 0, margin: 0, profit: 0 });
    };
  }, [props.fields]);
  return (
    <div>
      <Radio.Group
        buttonStyle="solid"
        value={type}
        onChange={e => setType(e.target.value)}
        className="flex w-full"
      >
        <Radio.Button id="Calculate-Revenue" value="cost">
          Calculate Revenue
        </Radio.Button>
        <Radio.Button id="Calculate-Cost" value="revenue">
          Calculate Cost
        </Radio.Button>
      </Radio.Group>
      <div className="mt-2 max-w-sm rounded overflow-hidden shadow-lg">
        <div className={styles["Calculator__top-content"]}>
          <div className={styles.Calculator__form}>
            <div className={styles.Calculator__column}>
              <div className={styles.SsrLoader}>
                <div className={styles.CalculatorRowGroup}>
                  <div
                    className={`${styles.CalculatorRow} ${
                      styles["CalculatorRow--focused"]
                    }`}
                  >
                    <div className={styles["CalculatorRow__input-box"]}>
                      <div
                        className={styles.CalculatorRow__name}
                        style={{ width: 36 }}
                      >
                        Cost
                      </div>
                      <InputNumber
                        id="input-price-calculator"
                        step={0.01}
                        onFocus={e => e.target.select()}
                        onChange={inputCost => {
                          /**
                           * On Cost Change,
                           */
                          if (isNaN(inputCost)) return;
                          setFields({ ...fields, cost: inputCost });

                          switch (type) {
                            case "cost": {
                              // when margin is available, change the revenue and profit
                              if (!isNaN(margin)) {
                                setFields({
                                  ...fields,
                                  cost: +inputCost,
                                  revenue: setNumberDecimal(
                                    +inputCost / (1 - +margin / 100),
                                    precision
                                  ),
                                  profit: setNumberDecimal(
                                    (+margin * +inputCost) / (100 - +margin),
                                    precision
                                  )
                                });
                              } else if (!isNaN(revenue) && !!revenue) {
                                setFields({
                                  ...fields,
                                  cost: +inputCost,
                                  margin: setNumberDecimal(
                                    ((+revenue - +inputCost) / +revenue) * 100,
                                    precision
                                  ),
                                  profit: setNumberDecimal(
                                    +revenue - +inputCost,
                                    precision
                                  )
                                });
                              } else if (!isNaN(profit)) {
                                setFields({
                                  ...fields,
                                  cost: +inputCost,
                                  margin: setNumberDecimal(
                                    (100 * +profit) / (+profit + +inputCost),
                                    precision
                                  ),
                                  revenue: setNumberDecimal(
                                    +cost + +profit,
                                    precision
                                  )
                                });
                              }
                              break;
                            }
                            case "revenue": {
                              if (!isNaN(cost)) {
                                setFields({
                                  ...fields,
                                  cost: +inputCost,
                                  margin: setNumberDecimal(
                                    ((+revenue - +inputCost) / +revenue) * 100,
                                    precision
                                  ),
                                  profit: setNumberDecimal(
                                    +revenue - +inputCost,
                                    precision
                                  )
                                });
                                break;
                              }
                              break;
                            }
                            default:
                              break;
                          }
                        }}
                        type="text"
                        autoComplete="off"
                        aria-label="Cost"
                        className={styles.CalculatorRow__input}
                        placeholder=""
                        value={fields.cost}
                        style={{ fontSize: 24, width: 38 }}
                      />
                    </div>
                    <div className={styles.CalculatorRow__unit}>
                      <span className={styles.CalculatorRow__monetary}>$</span>
                    </div>
                    <span />

                    <div className={styles["CalculatorRow__info-box"]} />
                  </div>
                  <div className={styles.CalculatorRow}>
                    <div className={styles["CalculatorRow__input-box"]}>
                      <div
                        className={styles.CalculatorRow__name}
                        style={{ width: 51 }}
                      >
                        Margin
                      </div>
                      <InputNumber
                        id="input-price-calculator"
                        step={0.01}
                        onFocus={e => e.target.select()}
                        inputMode="numeric"
                        onChange={inputMargin => {
                          /**
                           * On Cost Change,
                           */
                          if (isNaN(inputMargin)) return;

                          setFields({ ...fields, margin: inputMargin });

                          switch (type) {
                            case "cost": {
                              // when margin is available, change the revenue and profit
                              if (!isNaN(inputMargin)) {
                                setFields({
                                  ...fields,
                                  margin: +inputMargin,
                                  revenue: setNumberDecimal(
                                    +cost / (1 - +inputMargin / 100),
                                    precision
                                  ),
                                  profit: setNumberDecimal(
                                    (+inputMargin * +cost) /
                                      (100 - +inputMargin),
                                    precision
                                  )
                                });
                              }
                              break;
                            }
                            case "revenue": {
                              if (!isNaN(inputMargin)) {
                                setFields({
                                  ...fields,
                                  margin: +inputMargin,
                                  profit: setNumberDecimal(
                                    (+revenue * +inputMargin) / 100,
                                    precision
                                  ),
                                  cost: setNumberDecimal(
                                    +revenue - (+inputMargin * +revenue) / 100,
                                    precision
                                  )
                                });
                                break;
                              }
                              break;
                            }
                            default:
                              break;
                          }
                        }}
                        type="text"
                        autoComplete="off"
                        aria-label="Margin"
                        className={styles.CalculatorRow__input}
                        placeholder=""
                        value={fields.margin}
                        style={{ fontSize: 24, width: 38 }}
                      />
                    </div>
                    <div className={styles.CalculatorRow__unit}>
                      <div className="">%</div>
                    </div>
                    <span />

                    <div className={styles["CalculatorRow__info-box"]} />
                  </div>
                  <div className={styles.CalculatorRow}>
                    <div className={styles["CalculatorRow__input-box"]}>
                      <div
                        className={styles.CalculatorRow__name}
                        style={{ width: 63 }}
                      >
                        Revenue
                      </div>
                      <InputNumber
                        id="input-price-calculator"
                        step={0.01}
                        onFocus={e => e.target.select()}
                        onChange={inputRevenue => {
                          /**
                           * On Cost Change,
                           */
                          if (isNaN(inputRevenue)) return;

                          setFields({ ...fields, revenue: +inputRevenue });

                          switch (type) {
                            case "cost": {
                              // when margin is available, change the revenue and profit
                              if (!isNaN(revenue) && !!revenue) {
                                setFields({
                                  ...fields,
                                  revenue: +inputRevenue,
                                  margin: setNumberDecimal(
                                    ((+inputRevenue - +cost) / +inputRevenue) *
                                      100,
                                    precision
                                  ),
                                  profit: setNumberDecimal(
                                    +inputRevenue - +cost,
                                    precision
                                  )
                                });
                              }
                              break;
                            }
                            case "revenue": {
                              if (!isNaN(margin)) {
                                setFields({
                                  ...fields,
                                  revenue: +inputRevenue,
                                  profit: setNumberDecimal(
                                    (+inputRevenue * +margin) / 100,
                                    precision
                                  ),
                                  cost: setNumberDecimal(
                                    +inputRevenue -
                                      (+margin * +inputRevenue) / 100,
                                    precision
                                  )
                                });
                                break;
                              } else if (!isNaN(cost)) {
                                setFields({
                                  ...fields,
                                  revenue: inputRevenue,
                                  margin: setNumberDecimal(
                                    ((+inputRevenue - +cost) / +inputRevenue) *
                                      100,
                                    precision
                                  ),
                                  profit: setNumberDecimal(
                                    +inputRevenue - +cost,
                                    precision
                                  )
                                });
                                break;
                              } else if (!isNaN(profit)) {
                                setFields({
                                  ...fields,
                                  revenue: +inputRevenue,
                                  margin: setNumberDecimal(
                                    (+profit / +inputRevenue) * 100,
                                    precision
                                  ),
                                  cost: setNumberDecimal(
                                    +inputRevenue - +profit,
                                    precision
                                  )
                                });
                                break;
                              }
                              break;
                            }
                            default:
                              break;
                          }
                        }}
                        type="text"
                        autoComplete="off"
                        aria-label="Revenue"
                        className={styles.CalculatorRow__input}
                        placeholder=""
                        value={fields.revenue}
                        style={{ fontSize: 24, width: 38 }}
                      />
                    </div>
                    <div className={styles.CalculatorRow__unit}>
                      <span className={styles.CalculatorRow__monetary}>$</span>
                    </div>
                    <span />

                    <div className={styles["CalculatorRow__info-box"]} />
                  </div>
                  <div className={styles.CalculatorRow}>
                    <div className={styles["CalculatorRow__input-box"]}>
                      <div
                        className={styles.CalculatorRow__name}
                        style={{ width: 40 }}
                      >
                        Profit
                      </div>
                      <InputNumber
                        id="input-price-calculator"
                        step={0.01}
                        onFocus={e => e.target.select()}
                        onChange={inputProfit => {
                          /**
                           * On Cost Change,
                           */
                          if (isNaN(inputProfit)) return;

                          setFields({ ...fields, profit: +inputProfit });

                          switch (type) {
                            case "cost": {
                              // when margin is available, change the revenue and profit
                              if (!isNaN(profit)) {
                                setFields({
                                  ...fields,
                                  profit: +inputProfit,
                                  margin: setNumberDecimal(
                                    (100 * inputProfit) /
                                      (+inputProfit + +cost),
                                    precision
                                  ),
                                  revenue: setNumberDecimal(
                                    +cost + +inputProfit,
                                    precision
                                  )
                                });
                              }
                              break;
                            }
                            case "revenue": {
                              if (!isNaN(profit)) {
                                setFields({
                                  ...fields,
                                  profit: +inputProfit,
                                  margin: setNumberDecimal(
                                    (+inputProfit / +revenue) * 100,
                                    precision
                                  ),
                                  cost: setNumberDecimal(
                                    +revenue - +inputProfit,
                                    precision
                                  )
                                });
                                break;
                              }
                              break;
                            }
                            default:
                              break;
                          }
                        }}
                        type="text"
                        autoComplete="off"
                        aria-label="Profit"
                        className={styles.CalculatorRow__input}
                        placeholder=""
                        value={fields.profit}
                        style={{ fontSize: 24, width: 38 }}
                      />
                    </div>
                    <div className={styles.CalculatorRow__unit}>
                      <span className={styles.CalculatorRow__monetary}>$</span>
                    </div>
                    <span />

                    <div className={styles["CalculatorRow__info-box"]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t mt-5 mb-5" />
      <div className="flex justify-between">
        <div>
          <Button
            id="Clear-Fields"
            onClick={() => {
              setFields({ cost: 0, revenue: 0, margin: 0, profit: 0 });
            }}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow"
          >
            Clear
          </Button>
        </div>
        <div>
          <Button
            id="Apply-To-Item"
            onClick={() => {
              props.onApply(fields);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
