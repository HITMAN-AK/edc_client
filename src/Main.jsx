import React, { useState } from "react";
import "../src/CSS/main.css"
function Main() {
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const colleges = [
    {
      name: "KRCT",
      departments: [
        {
          name: "PRINCIPLE OFFICE",
          staff: ["AK"],
        },
        {
          name: "AIML",
          staff: ["aml1", "aml2", "aml3"],
        },
        {
          name: "CSE",
          staff: ["cse1", "cse2", "cse3"],
        },
        {
          name: "AIDS",
          staff: ["ads1", "ads2", "ads3"],
        },
        {
          name: "MECH",
          staff: ["mec1", "mec2", "mec3"],
        },
        {
          name: "CIVIL",
          staff: ["civ1", "civ2", "civ3"],
        },
      ],
    },
  ];

  const handleCollegeChange = (e) => {
    const collegeName = e.target.value;
    setSelectedCollege(collegeName);
    setSelectedDepartment("");
    setSelectedStaff("");
  };

  const handleDepartmentChange = (e) => {
    const departmentName = e.target.value;
    setSelectedDepartment(departmentName);
    setSelectedStaff("");
  };

  const handleStaffChange = (e) => {
    const staffName = e.target.value;
    setSelectedStaff(staffName);
  };
  return (
    <div className="mmain">
      <div className="mbody">
        <select
          id="colleges"
          value={selectedCollege}
          onChange={handleCollegeChange}
        >
          <option value="">Select a college</option>
          {colleges.map((college) => (
            <option key={college.id} value={college.name}>
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
                  <option key={department.name} value={department.name}>
                    {department.name}
                  </option>
                ))}
          </select>
        </>
        <>
          <select id="staff" value={selectedStaff} onChange={handleStaffChange}>
            <option value="">Select a staff</option>
            {selectedDepartment &&
              colleges
                .find((college) => college.name === selectedCollege)
                .departments.find(
                  (department) => department.name === selectedDepartment
                )
                .staff.map((staffMember) => (
                  <option key={staffMember} value={staffMember}>
                    {staffMember}
                  </option>
                ))}
          </select>
        </>
      </div>
    </div>
  );
}
export default Main;
