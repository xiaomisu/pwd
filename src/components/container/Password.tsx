import React, { useState } from "react";
import "./password.scss";
import {Post} from "../../http";

export const Password: React.FC = () => {
  const [length, setLength] = useState(4);
  const [pwd, setPwd] = useState(0);
  const [device, setDevice] = useState<deviceType>("ipad");
  const generatePassword = async () => {

   const data = await Post('/api/pwd/insert', {device: device, length: length})
      const {pwd, id} = data
      setPwd(Number(pwd))
      window.localStorage.setItem(
          `password${new Date(Date.now())}` + ' ' + device,
          id
      );

  };
  return (
    <div className="background">
      <h1 className="heading">Generate a random password</h1>
      <div className="wrapper container">
        <div className="grid grid-cols-1 justify-center mt-4 px-10">
          <div className="flex flex-row justify-start mb-4  basis-1/2">
            Password Length:
            <input
              type="number"
              className=" ml-3 "
              value={length}
              onChange={(event) => setLength(Number(event.target.value))}
            />
          </div>
          <div className="flex flex-row justify-start mb-4 w-1/2">
            select devices:
            <select
              value={device}
              onChange={(event) => {
                setDevice(event.target.value as deviceType);
              }}
              className="ml-3"
              aria-label="Default select example"
            >
              <option value="ipad">ipad</option>
              <option value="lg">lg</option>
              <option value="mi">mi</option>
            </select>
          </div>

          <button className="generate-password mb-4" onClick={generatePassword}>
            Generate password
          </button>

          <div className="flex flex-row justify-start mb-4  basis-1/2">
           show password 60s：
            <input
                type="number"
                className=" ml-3 "
                value={pwd}
                onChange={(event) => setPwd(Number(event.target.value))}
            />
          </div>

        </div>
      </div>
    </div>
  );
};
