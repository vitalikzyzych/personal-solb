"use client";
import { themes } from "@/constants/theme";
import { AppDispatch } from "@/core/rootStore";
import { appSelector } from "@/store";
import { getTheme, setTheme } from "@/store/settings";
import { useRouter } from "next/navigation";
import { RadioButton } from "primereact/radiobutton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type Page } from "types";

const Settings: Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    settings: { theme },
  } = useSelector(appSelector);

  useEffect(() => {
    dispatch(getTheme());
  }, []);

  const handleThemeChange = (theme: string) => {
    dispatch(setTheme(theme));
  };
  return (
    <>
      <h6 className="mb-3">Settings</h6>
      <div className="card flex align-items-start justify-content-between flex-column">
        <h6 className="mb-3">Theme</h6>
        <div className="w-15rem md:w-20rem">
          {themes.map((themeItem) => (
            <div
              key={themeItem.name}
              className="flex align-items-center justify-content-between mb-2"
            >
              <div className="radio-label">
                <RadioButton
                  inputId={themeItem.name}
                  value={theme}
                  onChange={() => handleThemeChange(themeItem.name)}
                  checked={theme === themeItem.name}
                />
                <label
                  htmlFor={themeItem.name}
                  style={{ marginLeft: "0.5rem" }}
                >
                  {themeItem.name}
                </label>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 20px)",
                  gridGap: "5px",
                }}
              >
                {themeItem.values.map((color, index) => (
                  <div
                    key={index}
                    className="col m-1 shadow-1"
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "1px solid #ccc",
                      borderRadius: "2px",
                      backgroundColor: color,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Settings;
