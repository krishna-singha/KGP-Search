import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(() => ""),
  }),
  usePathname: () => "",
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));
