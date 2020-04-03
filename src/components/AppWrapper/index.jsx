import React from "react";
import { Tabs, Icon } from "antd";
import "antd/dist/antd.css";
import "./index.css";
const { TabPane } = Tabs;

const AppWrapper = props => {
  return (
    <div>
      <div className="rounded bg-white shadow-md">
        <h1 className="p-4 text-xl">You are off to a great start</h1>
        <div className="card-container fancy-tab">
          <Tabs type="card" tabPosition="left">
            <TabPane
              tab={
                <div>
                  <Icon type="check-circle" /> Add Product
                </div>
              }
              key="1"
            >
              <div className="flex">
                <div className="flex-auto">
                  <div className="text-lg font-medium">
                    You have added new products
                  </div>
                  <div className="text-xs">
                    Add more products or move on to another tip.
                  </div>
                  <div>
                    <span className="bg-purple-600 rounded text-white p-4">
                      Add another product
                    </span>
                  </div>
                </div>
                <div className="w-36">
                  <img
                    src="https://cdn.shopify.com/s/assets/admin/home/onboarding/home-onboard-prod-complete-a6f218ca2009b9a3d21ab21d90aa7573f8de9785a4af49cd248cf3b1846d8f8a.svg"
                    alt=""
                  />
                </div>
              </div>
            </TabPane>
            <TabPane
              tab={
                <div>
                  <Icon type="arrow-right" /> Customize Quote Package
                </div>
              }
              key="2"
            >
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
            </TabPane>
            <TabPane
              tab={
                <div>
                  <Icon type="question-circle" /> Add Domain Emails
                </div>
              }
              key="3"
            >
              <p>Content of Tab Pane 3</p>
              <p>Content of Tab Pane 3</p>
              <p>Content of Tab Pane 3</p>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AppWrapper;
