import { addOrReplace } from "../array_utilities/addOrReplace";
describe("test addOrReplace ", () => {
  const arr = [
    { id: 0, name: "Person 0", ts: 12345678 },
    { id: 1, name: "Person 1", ts: 1234567 },
    { id: 2, name: "Person 2", ts: 234556 },
  ];
  const newArr = [
    { id: 1, name: "Person 1 new", ts: 1234567 },
    { id: 3, name: "Person 3", ts: 122342345 },
  ];
  it("should append a new object into the array if the id does not already exist or update the record if it does", () => {
    const result = addOrReplace(arr, newArr);
    expect(result).toStrictEqual([
      { id: 3, name: "Person 3", ts: 122342345 },
      { id: 0, name: "Person 0", ts: 12345678 },
      { id: 1, name: "Person 1 new", ts: 1234567 },
      { id: 2, name: "Person 2", ts: 234556 },
    ]);
  });
});
