import { useEffect, useRef, useState } from "react";
import Pill from "./components/pill";
import debounce from "lodash/debounce";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [highlightedIndex, setHighlightedIndex] = useState(-1); 
  const inputRef = useRef(null);

  const fetchUsers = debounce(() => {
    if (searchTerm.trim() === "") {
      setSuggestion([]);
      return;
    }

    fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setSuggestion(data))
      .catch((error) => console.error("Error:", error));
  }, 300);

  useEffect(() => {
    fetchUsers();
    return () => {
      fetchUsers.cancel();
    };
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && e.target.value === "" && selectedUsers.length > 0) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestion([]);
    } else if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % suggestion.users.length);
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => (prevIndex === 0 ? suggestion.users.length - 1 : prevIndex - 1));
    } else if (e.key === "Enter" && highlightedIndex >= 0 && suggestion.users.length > 0) {
      handleSelectedUser(suggestion.users[highlightedIndex]);
    }
  };

  const handleSelectedUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm("");
    setSuggestion([]);
    setHighlightedIndex(-1);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter((selectedUser) => {
      return selectedUser.id !== user.id;
    });
    setSelectedUsers(updatedUsers);
    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {selectedUsers.map((user) => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a user"
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
          <ul className="suggestions-list">
            {suggestion?.users?.map((user, index) => {
              return !selectedUserSet.has(user.email) ? (
                <li
                  key={index}
                  onClick={() => handleSelectedUser(user)}
                  style={{
                    backgroundColor: (index === highlightedIndex) ? "#d3d3d3" : "transparent",
                  }}
                >
                  <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                  <span>{user.firstName} {user.lastName}</span>
                </li>
              ) : (
                <li key={index} style={{ display: "none" }}></li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;