import React from "react";
import { shallow, mount } from "enzyme";
import AccountDetails from "../accounts/AccountDetails";

const clickFn = jest.fn();

describe("AccountDetails", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<AccountDetails debug />);
    expect(component).toMatchSnapshot();
  });

  const data = [
    {
      id: 1,
      account_name: "Savings Account",
      account_type: "savings",
      balance: 32334.32,
      currency: "SGD",
      account_number: "342423455344",
      is_active: true,
    },
    {
      id: 2,
      account_name: "Bonus Savings Account",
      account_type: "savings",
      balance: -5.11,
      currency: "AUD",
      account_number: "156478245",
      is_active: true,
    },
  ];

  it("should render accordian  correctly with given data", () => {
    const component = shallow(<AccountDetails list={data} />);
    expect(component).toMatchSnapshot();
  });
});
