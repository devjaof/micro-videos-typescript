import { SearchParams } from "./repositoryContracts"

describe("SearchParams unit tests", () => {
  test("page prop", () => {
    const arrange = [
      {page: null, expected:1},
      {page: undefined, expected:1},
      {page: "", expected:1},
      {page: "fake", expected:1},
      {page: -1, expected:1},
      {page: {}, expected:1},
      {page: 5.5, expected:1},
      {page: true, expected:1},
      {page: false, expected:1},
      {page: 1, expected:1},
      {page: 2, expected:2},
    ]

    arrange.forEach(item => {
      expect(new SearchParams({page: item.page as any}).page).toBe(item.expected);
    })
  })

  test("perPage prop", () => {
    const arrange = [
      {perPage: "", expected:15},
      {perPage: "fake", expected:15},
      {perPage: -1, expected:15},
      {perPage: {}, expected:15},
      {perPage: 5.5, expected:15},
      
      {perPage: true, expected:15},
      {perPage: null, expected:15},
      {perPage: false, expected:15},
      {perPage: undefined, expected:15},

      {perPage: 1, expected:1},
      {perPage: 2, expected:2},
      {perPage: 400, expected:400},
    ]
    arrange.forEach(item => {
      expect(new SearchParams({perPage: item.perPage as any}).perPage).toBe(item.expected);
    })
  })


  test("sortField prop", () => {
    const params = new SearchParams();
    expect(params.sortField).toBeNull;

    const arrange = [
      { sortField: undefined, expected: null },
      { sortField: null, expected: null },
      { sortField: "", expected: null},
      { sortField: {}, expected: "[object Object]" },
     
      { sortField: -1, expected: "-1" },
      { sortField: 5.5, expected: "5.5" },
      { sortField: true, expected: "true" },
      { sortField: false, expected: "false" },
      { sortField: "field", expected: "field" },
    ]

    arrange.forEach(item => {
      expect(new SearchParams({sortField: item.sortField as any}).sortField).toBe(item.expected);
    })
  })
})