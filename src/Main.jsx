import React, { useEffect, useState } from "react";
import axios from "axios";
import Load from "./Load";
import "../src/CSS/main.css";
function Main() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [n, setn] = useState();
  const [a, seta] = useState();
  const [w, setw] = useState();
  const [sa, setsa] = useState(false);
  const [sc, setsc] = useState("green");
  const [load, setload] = useState(true);
  useEffect(() => {
    const gd = async () => {
      await axios.post(`${process.env.REACT_APP_API_URL}/gd`).then((res) => {
        setColleges(res.data.det);
        setload(false);
      });
    };
    gd();
  }, []);
  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
    setSelectedDepartment("");
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedStaff("");
  };

  const handleStaffChange = (event) => {
    setSelectedStaff(event.target.value);
  };
  const sub = async (event) => {
    event.preventDefault();
    setload(true)
    console.log(selectedCollege, selectedDepartment, selectedStaff);
    if (selectedCollege !== "") {
      if (selectedDepartment !== "") {
        if (selectedStaff !== "") {
          setsa(true);
          await axios
            .post(`${process.env.REACT_APP_API_URL}/status`, {
              clg: selectedCollege,
              dep: selectedDepartment,
              sta: selectedStaff,
            })
            .then((res) => {
              seta(res.data.s);
              setload(false)
              if (res.data.s === "AVAILABLE") {
                setsc("green");
              } else if (res.data.s === "NOT AVAILABLE") {
                setsc("red");
              } else {
                setsc("red");
              }
              setn(res.data.name);
              setw(res.data.workingtime);
            });
        }
      }
    }
  };
  const cl = () => {
    window.location.reload(true);
    setsa(false);
  };
  return (
    <>
      {load ? (
        <Load />
      ) : (
        <div className="mmain">
          {sa ? (
            <div className="cbody">
              <h4>
                NAME : <span>{n}</span>
              </h4>
              <h4>
                AVAILABILITY : <span style={{ color: `${sc}` }}>{a}</span>
              </h4>
              <h4>
                WORKING HOURS : <span>{w}</span>
              </h4>
              <button onClick={cl}>CLOSE</button>
            </div>
          ) : (
            <div className="mbody">
              <div id="cao">Check the availability of the officials...</div>
              <select
                id="colleges"
                value={selectedCollege}
                onChange={handleCollegeChange}
              >
                <option value="">Select a college</option>
                {colleges.map((college) => (
                  <option key={college._id} value={college.name}>
                    {college.name}
                  </option>
                ))}
              </select>
              <>
                <select
                  id="departments"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="">Select a department</option>
                  {selectedCollege &&
                    colleges
                      .find((college) => college.name === selectedCollege)
                      .departments.map((department) => (
                        <option key={department._id} value={department.name}>
                          {department.name}
                        </option>
                      ))}
                </select>
              </>
              <>
                <select
                  id="staff"
                  value={selectedStaff}
                  onChange={handleStaffChange}
                >
                  <option value="">Select a staff</option>
                  {selectedDepartment &&
                    colleges
                      .find((college) => college.name === selectedCollege)
                      .departments.find(
                        (department) => department.name === selectedDepartment
                      )
                      .staff.map((staffMember) => (
                        <option key={staffMember._id} value={staffMember.name}>
                          {staffMember.name}
                        </option>
                      ))}
                </select>
              </>
              <button type="submit" onClick={sub}>
                SUBMIT
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Main;
