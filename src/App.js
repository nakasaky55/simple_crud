import React from "react";
import "./App.css";

import SearchAppBar from "./components/header";
import ProfilePage from "./pages/profilePage";
import CreateDialog from "./components/createDialog";

import { URL, key } from "./constants/constant";

function App() {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState();
  const [filter, setFilter] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const callData = async () => {
    setLoading(true);
    const fetchData = await fetch(URL, {
      headers: {
        Authorization: `token ${key}`,
      },
    });
    const response = await fetchData.json();

    if (response) {
      setTotal(response.total);
      if (filter && filter.length > 0) {
        const filterData = response.data.filter((item) => {
          if (item.name === filter || item.position === filter) return true;
          return false;
        });
        setData(filterData);
      } else setData(response.data);
    } else {
      setData([]);
    }
    setLoading(false);
  };

  const deleteData = async (id) => {
    setLoading(true);
    const afterDeleting = data.filter((item) => item.id !== id);
    const bodyData = {
      data: afterDeleting,
      total: total,
    };

    const fetchData = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `token ${key}`,
      },
      body: JSON.stringify(bodyData),
    });

    const response = await fetchData.json();
    if (response) {
      setData(afterDeleting);
      setTotal(response.total);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const updateData = async (id, payload) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        item.name = payload.name;
        item.age = payload.age;
        item.position = payload.position;
        item.Note = payload.Note;
      }
      return item;
    });

    setLoading(true);
    const bodyData = {
      data: updatedData,
      total,
    };

    const fetchData = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `token ${key}`,
      },
      body: JSON.stringify(bodyData),
    });

    const response = await fetchData.json();
    if (response) {
      setData(response.data);
      setLoading(false);
      return true;
    }
    setLoading(false);
    return false;
  };

  const addData = async (newRecord) => {
    newRecord.id = total + 1;
    data.unshift(newRecord);
    const bodyData = {
      data,
      total: total + 1,
    };
    const fetchData = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `token ${key}`,
      },
      body: JSON.stringify(bodyData),
    });

    const response = await fetchData.json();
    if (response) {
      setData(response.data);
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    callData();
    return () => {
      setData([]);
    };
  }, []);

  React.useEffect(() => {
    callData();
    return () => {
      setFilter();
    };
  }, [filter]);

  return (
    <>
      <SearchAppBar
        setFilter={setFilter}
        setLoading={setLoading}
        addData={addData}
      />
      <ProfilePage
        data={data}
        loading={loading}
        deleteData={deleteData}
        updateData={updateData}
      />
    </>
  );
}

export default App;
