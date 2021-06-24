import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa"
import Model from "./Model"
import Link from 'next/link';

const birthDates = [];
const birthMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const birthYears = [];

for (let i = 1905; i <= 2021; i++) birthYears.unshift(i);
for (let i = 1; i <= 31; i++) birthDates.push(i);

const CreateAccountModel = ({ closeModel }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        surName: '',
        email: '',
        phone: '',
        password: '',
        birthDates,
        birthDate: '',
        birthMonth: birthMonths[0],
        birthYear: birthYears[birthYears.length - 1], 
        gender: ''
    })
  
  const inputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // adjust february days depending on month and leap year
    useEffect(() => {
        const newDates = [];
        let limit = 31;
        const monthNumber = birthMonths.indexOf(formData.birthMonth) + 1;
          
      if (monthNumber <= 7 && monthNumber % 2 === 0) {
        if (monthNumber === 2) {
          if (formData.birthYear % 4 === 0 && formData.birthYear % 100 !== 0 || formData.birthYear % 400 === 0) {
            limit = 29;
          } else { limit = 28 };
        } else { limit = 30 };
        }
        if (monthNumber > 7 && monthNumber % 2 !== 0) {
            limit = 30
        }
      for (let i = 1; i <= limit; i++) newDates.push(i);
      setFormData({...formData, birthDates: newDates})
    }, [formData.birthMonth, formData.birthYear])

    const createAccount = (e) => {
      e.preventDefault();
  };
  
    return (
      <Model
        className="rounded-sm w-[90vw] sm:w-[450px]"
        disableCloseByBackDrop
      >
        <div className="p-3 border-b-2 flex justify-between items-start text-gray-600">
          <div>
            <p className="text-3xl font-bold text-black capitalize">sign up</p>
            <p>It's quick and easy</p>
          </div>
          <button className="text-xl" onClick={closeModel} tabIndex="-1">
            <FaTimes />
          </button>
        </div>
        <form className="p-3 text-gray-600" onSubmit={createAccount}>
          <div className="my-2 grid md:grid-cols-2  gap-2">
            <input
              type="text"
              name="firstName"
              className="w-full border border-gray-300 p-2 rounded bg-secondary focus:outline-none focus:ring-1"
              placeholder="First name"
              onChange={inputChange}
              value={formData.firstName}
            />
            <input
              type="text"
              name="surName"
              className="w-full border border-gray-300 p-2 rounded bg-secondary focus:outline-none focus:ring-1"
              placeholder="Surname"
              onChange={inputChange}
              value={formData.surName}
            />
          </div>
          <input
            type="email"
            name="email"
            className="block w-full border border-gray-300 p-2 my-2 rounded bg-secondary focus:outline-none focus:ring-1"
            placeholder="Email Address"
            onChange={inputChange}
            value={formData.email}
          />
          <input
            type="number"
            name="phone"
            className="block w-full border border-gray-300 p-2 my-2 rounded bg-secondary focus:outline-none focus:ring-1"
            placeholder="Phone Number"
            onChange={inputChange}
            value={formData.phone}
          />
          <input
            type="password"
            name="password"
            className="block w-full border border-gray-300 p-2 my-2 rounded bg-secondary focus:outline-none focus:ring-1"
            placeholder="New Password"
            autoComplete="new password"
            onChange={inputChange}
            value={formData.password}
          />
          <div className="mt-3 mb-2 ">
            <p className="text-sm">Date of birth</p>
            <div className="flex gap-x-2 ">
              <select
                className="w-full border border-gray-300 p-2 rounded capitalize focus:outline-none focus:ring-1"
                name="birthDate"
                onChange={inputChange}
                value={formData.birthDate}
              >
                <option>day</option>
                {formData.birthDates.map((date) => (
                  <option value={date} key={date}>
                    {date}
                  </option>
                ))}
              </select>
              <select
                className="w-full border border-gray-300 p-2 rounded capitalize focus:outline-none focus:ring-1"
                name="birthMonth"
                onChange={inputChange}
                value={formData.birthMonth}
              >
                <option>month</option>
                {birthMonths.map((month) => (
                  <option value={month} key={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className="w-full border border-gray-300 p-2 rounded capitalize focus:outline-none focus:ring-1"
                name="birthYear"
                onChange={inputChange}
                value={formData.birthYear}
              >
                <option>year</option>
                {birthYears.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 mb-2">
            <p className="text-sm">Gender</p>
            <div className="flex gap-x-2">
              <label className="w-full flex justify-between items-center border border-gray-300 p-2 rounded capitalize">
                <p>Female</p>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={inputChange}
                />
              </label>
              <label className="w-full flex justify-between items-center border border-gray-300 p-2 rounded capitalize">
                <p>Male</p>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={inputChange}
                />
              </label>
              <label className="w-full flex justify-between items-center border border-gray-300 p-2 rounded capitalize">
                <p>Custom</p>
                <input
                  type="radio"
                  name="gender"
                  value="custom"
                  onChange={inputChange}
                />
              </label>
            </div>
          </div>
          <p className="my-2 text-sm">
            <span>By clicking Sign Up, you agree to our </span>{" "}
            <Link href="/terms">
              <a href="/terms" className="text-blue-500 hover:underline">
                Terms
              </a>
            </Link>
            {", "}
            <Link href="/data-policy">
              <a href="/data-policy" className="text-blue-500 hover:underline">
                Data Policy
              </a>
            </Link>
            {", "}
            <Link href="/cookie-policy">
              <a
                href="/cookie-policy"
                className="text-blue-500 hover:underline"
              >
                Cookie Policy
              </a>
            </Link>{" "}
            <span>
              , and . You may receive SMS notifications from us and can opt out
              at any time.
            </span>
          </p>
        </form>
      </Model>
    );
}

export default CreateAccountModel
