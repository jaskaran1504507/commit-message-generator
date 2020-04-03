import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tabs, Select, Input, Typography } from "antd";
const { Option } = Select;
const { Paragraph } = Typography;
import "antd/dist/antd.css";
import "./index.css";
const { TabPane } = Tabs;

const App = () => {
  const [ticketId, setTicketId] = useState("");
  const [author, setAuthor] = useState("");
  const [because, setBecause] = useState("");
  const [changes, setChanges] = useState("");
  const [brief, setBrief] = useState("");
  const [branchType, setBranchType] = useState("feature");

  return (
    <div className="container mx-auto pt-10 max-w-lg">
      <div className="text-3xl text-blue-800 font-semibold">
        <span aria-label="superman" role="img">
          🐱‍🏍
        </span>
        Code Commit Message Generator
      </div>
      <div className="text-base text-gray-500 pl-10">
        <div className="text-base text-gray-700">
          Super charge your code commit messages
        </div>
        Utility tool to generate a descriptive message for comitting your code.
      </div>
      <div className="pt-10">
        <label className="text-gray-600 text-xs uppercase font-semibold">
          Author Name
        </label>
        <Input
          size="large"
          placeholder="John Doe"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <div className="border mt-4 rounded">
          <div className="text-xl p-2">
            <div className="flex justify-between">
              <div className="font-semibold">Branch name generator</div>
              <div>
                <span aria-label="pin" role="img">
                  📌
                </span>
              </div>
            </div>
          </div>
          <div className="flex p-2">
            <div>
              <label className="text-gray-600 text-xs uppercase font-semibold">
                Branch Type
              </label>
              <Select
                defaultValue={branchType}
                className="w-full"
                onChange={setBranchType}
              >
                <Option value="feature">Feature</Option>
                <Option value="bug">Bug</Option>
                <Option value="enhancement">Enhancement</Option>
                <Option value="hotfix">Hotfix</Option>
                <Option value="release">Release</Option>
              </Select>
            </div>
            <div className="flex-auto">
              {" "}
              <label className="text-gray-600 text-xs uppercase font-semibold">
                Ticket / Issue / Enhancement #
              </label>
              <Input
                placeholder="ZS1543"
                value={ticketId}
                onChange={e => setTicketId(e.target.value)}
              />{" "}
            </div>
          </div>
          <div className="p-2">
            <label className="text-gray-600 text-xs uppercase font-semibold">
              Ticket introduction in brief
            </label>
            <Input
              placeholder="eg. Vendor Api integration with screen"
              value={brief}
              onChange={e => setBrief(e.target.value)}
            />
          </div>
          <div className="text-lg mt-4 p-2 bg-gray-100">
            <Paragraph copyable>
              {branchType}/{ticketId}-
              {brief.toLocaleLowerCase().replace(" ", "_")}
            </Paragraph>
          </div>
        </div>
      </div>
      <div className="border mt-4 rounded">
        <div className="">
          <div className="text-xl p-2">
            <div className="flex justify-between">
              <div className="font-semibold">Commit message generator</div>
              <div>
                <span aria-label="message" role="img">
                  📃
                </span>
              </div>
            </div>
          </div>
          <div className="p-2">
            <label className="text-gray-600 text-xs uppercase font-semibold">
              Ticket Id
            </label>
            <Input
              size="large"
              placeholder="What is the ticket id specific to your commit?"
              value={ticketId}
              onChange={e => setTicketId(e.target.value)}
            />
          </div>
          <div className="p-2">
            <label className="text-gray-600 text-xs uppercase font-semibold">
              Because
            </label>
            <Input
              size="large"
              placeholder="Why did you made these changes?"
              value={because}
              onChange={e => setBecause(e.target.value)}
            />
          </div>
          <div className="p-2">
            <label className="text-gray-600 text-xs uppercase font-semibold">
              Changes
            </label>
            <Input
              size="large"
              placeholder="Briefly explain in technical terms, what changes were made."
              value={changes}
              onChange={e => setChanges(e.target.value)}
            />
          </div>
        </div>
        <div className="text-lg mt-4 p-2 bg-gray-100">
          <Paragraph copyable>
            {ticketId} Because: {because}
            {". Changes"}: {changes}
            {". Author"}: {author}
          </Paragraph>
        </div>
      </div>
      {/* Author details */}
      <div className="text-center pt-8">
        Prepared with{" "}
        <span role="img" aria-label="heart" className="text-red-600">
          ♥
        </span>{" "}
        by <a href="https://github.com/manjotsk">Manjot Kalsi</a> for{" "}
        <a href="https://github.com/SimbaQuartz">SimbaQuartz</a>.
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// ZCD15423: Because:this was happeneing. Changes: This was changed
