import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useCallback } from "react";

export const Header = ({ searchCallback }) => {
  const searchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const value = event.currentTarget.input.value;
      if (value !== "") {
        searchCallback(value);
      }
    },
    [searchCallback]
  );

  return (
    <div className="home-header">
      <img className="header-logo" src="https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=2048x2048&w=is&k=20&c=ESdZxqDKqzi91tZX89hjnjxFWLG9OfUxSFzNqdMIj64="/>
      <div className="header-title">GALLERY</div>
      <div className="search-input">
        <form
          className="search-form"
          onSubmit={(event) => {
            searchSubmit(event);
          }}
        >
          <button
            children={
              <FontAwesomeIcon icon={faSearch} style={{ fontSize: "15px" }} />
            }
            type="submit"
            className="search-button"
          />
          <input
            placeholder="Search photos"
            name="input"
            autoComplete="off"
            className="search-input-box"
          />
        </form>
      </div>
    </div>
  );
};