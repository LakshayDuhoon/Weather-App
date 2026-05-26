import React, { useState } from "react";

const Unites = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="Unit-container">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setOpen(!open)}
        >
          ⚙ Settings ⌄
        </button>
        ;
        {open && (
          <div className="dropdown-menu-custom">
            <div>
              <button className="dropdown-btn">Swicth to Imperial</button>
            </div>
            <p className="heading">Temperature</p>

            <div>
              <button className="dropdown-btn">Celcius (C)</button>
            </div>
            <div>
              <button className="dropdown-btn">Fahrenheite(F)</button>
            </div>
            <hr />
            <p className="heading">Wind Speed</p>
            <div>
              <button className="dropdown-btn">km/h</button>
            </div>
            <div>
              <button className="dropdown-btn">mph</button>
            </div>
            <hr />
            <p className="heading">Precipitation</p>

            <div>
              <button className="dropdown-btn">Millimeters(mm)</button>
            </div>
            <div>
              <button className="dropdown-btn">Inches(in)</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Unites;
