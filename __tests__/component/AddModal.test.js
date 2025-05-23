import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import AddModal from "../../src/components/AddModal";
import * as adminApi from "../../src/api/adminApi";
import Toast from "react-native-simple-toast";
import { launchImageLibrary } from "react-native-image-picker";

jest.mock("../../src/api/adminApi", () => ({
  addMovie: jest.fn(),
}));
jest.mock("react-native-simple-toast", () => ({
  show: jest.fn(),
  LONG: 1,
}));
jest.mock("react-native-image-picker", () => ({
  launchImageLibrary: jest.fn(),
}));


async function fillForm(getByPlaceholderText, exising = {}) {
  fireEvent.changeText(getByPlaceholderText("Enter movie title"), exising.title || "Test Title");
  fireEvent.changeText(getByPlaceholderText("Genre (e.g. Action, Drama)"), exising.genre || "Drama");
  fireEvent.changeText(getByPlaceholderText("Enter release year"), exising.releaseYear || "2024");
  fireEvent.changeText(getByPlaceholderText("Enter rating (1-10)"), exising.rating || "7");
  fireEvent.changeText(getByPlaceholderText("Enter director name"), exising.director || "Director");
  fireEvent.changeText(getByPlaceholderText("Duration in minutes"), exising.duration || "120");
  fireEvent.changeText(getByPlaceholderText("Enter main actor/actress"), exising.mainLead || "Main Lead");
  fireEvent.changeText(getByPlaceholderText("Movie description"), exising.description || "Some description");
}

describe("AddModal", () => {
  const handleModalClose = jest.fn();
  const update = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when open", () => {
    const { getByText } = render(
      <AddModal isModalOpen={true} handleModalClose={handleModalClose} update={update} />
    );
    expect(getByText("Add New Movie")).toBeTruthy();
    expect(getByText("Add Movie")).toBeTruthy();
  });

  it("calls handleModalClose when cancel is pressed", () => {
    const { getByText } = render(
      <AddModal isModalOpen={true} handleModalClose={handleModalClose} update={update} />
    );
    fireEvent.press(getByText("Cancel"));
    expect(handleModalClose).toHaveBeenCalled();
  });

  it("calls addMovie and shows success toast on valid submit", async () => {
    (adminApi.addMovie).mockResolvedValueOnce({});
    const { getByText, getByPlaceholderText } = render(
      <AddModal isModalOpen={true} handleModalClose={handleModalClose} update={update} />
    );
    await fillForm(getByPlaceholderText);
    await act(async () => {
      fireEvent.press(getByText("Add Movie"));
    });
    expect(adminApi.addMovie).toHaveBeenCalled();
    expect(Toast.show).toHaveBeenCalledWith("Movie Added!", Toast.LONG);
    expect(update).toHaveBeenCalled();
    expect(handleModalClose).toHaveBeenCalled();
  });

  it("shows error toast and calls update on failed submit", async () => {
    (adminApi.addMovie).mockRejectedValueOnce({ response: "err" });
    const { getByText, getByPlaceholderText } = render(
      <AddModal isModalOpen={true} handleModalClose={handleModalClose} update={update} />
    );
    await fillForm(getByPlaceholderText);
    await act(async () => {
      fireEvent.press(getByText("Add Movie"));
    });
    expect(adminApi.addMovie).toHaveBeenCalled();
    expect(Toast.show).toHaveBeenCalledWith("Failed to add movie!", Toast.LONG);
    expect(update).toHaveBeenCalled();
  });

  it("sets poster image when picking poster", async () => {
    (launchImageLibrary).mockImplementation((_opts, cb) =>
      cb({ assets: [{ uri: "posteruri", fileName: "poster.jpg", type: "image/jpeg" }] })
    );
    const { getAllByText } = render(
      <AddModal isModalOpen={true} handleModalClose={handleModalClose} update={update} />
    );
    fireEvent.press(getAllByText("Pick Poster Image")[0]);
  });

  it("sets banner image when picking banner", async () => {
    (launchImageLibrary).mockImplementation((_opts, cb) =>
      cb({ assets: [{ uri: "banneruri", fileName: "banner.jpg", type: "image/jpeg" }] })
    );
    const { getAllByText } = render(
      <AddModal isModalOpen={true} handleModalClose={handleModalClose} update={update} />
    );
    fireEvent.press(getAllByText("Pick Banner Image")[0]);
  });
});