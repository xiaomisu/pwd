import React, { useState } from "react";
import "./password.scss";
import { notification } from "antd";
import bcrypt from "bcryptjs";

export const Password: React.FC = () => {
  const [length, setLength] = useState(4);
  const [device, setDevice] = useState<deviceType>("ipad");
  const generatePassword = async () => {
    // Create a random password
    // const randomPassword =
    //   Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const randomPassword = Math.random()
      .toString()
      .slice(2, 2 + length);
    // Set the generated password as state

    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync("B4c0//", salt);
    console.log(hash);
    // const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    // console.log(hash);
    // Store hash in your password DB.

    // copy the password to the clipboard & fire toast message

    navigator.clipboard.writeText(randomPassword).then((res) => {
      notification.open({ message: "Password copied to your clipboard" });
      window.localStorage.setItem(
        `password${new Date(Date.now())}`,
        randomPassword + device
      );
    });
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

          <button className="generate-password" onClick={generatePassword}>
            Generate password
          </button>
        </div>
      </div>
    </div>
  );
};
