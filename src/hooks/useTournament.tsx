import { useEffect, useState } from "react";
import type { TablesMap } from "../types/table";
import axios from "axios";
import { io } from "socket.io-client";

const url = "http://localhost:3000";

const socket = io(url);

export const useTournament = () => {
  const [tables, setTables] = useState<TablesMap>({});

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get(`${url}/tournament/tables`);
        setTables(res.data || {});
      } catch (error) {
        console.error(error);
      }
    };

    fetchTables();

    socket.on("tables", (data) => {
      console.log(tables);
      setTables(data || {});
    });

    return () => {
      socket.off("tables");
    };
  }, []);

  const sync = async (text: string, tableName: string, category: string) => {
    await axios.post(`${url}/tournament/process`, {
      text: text,
      category: category,
      tableName: tableName,
    });
  };

  const del = async (category: string, tableName?: string) => {
    await axios.delete(
      `${url}/tournament/tables/${category}${tableName ? `/${tableName}` : ""}`,
    );
  };

  return { tables, sync, del };
};
