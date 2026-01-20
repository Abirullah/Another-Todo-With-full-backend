import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import TopBar from "./components/TopBar";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getStats,
  startWorking,
} from "./api";
import AuthProvider, { useAuth } from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";

function Home() {
  const [todos, setTodos] = useState([]);
  const [CurrentContant, setCurrentContant] = useState("All")
  const [filter, setFilter] = useState({ status: "", priority: "" });
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    underprocess: 0,
    completed: 0,
    percentage: 0,
  });
  const auth = useAuth();
  const navigate = useNavigate();
  const load = async () => {
    const data = await fetchTodos(filter);
    setTodos(data || []);
    const s = await getStats();
    setStats(s || {});
  };

  useEffect(() => {
    load();
  }, [filter]);

  const handleCreate = async (payload) => {
    await createTodo(payload);
    load();
  };

  const handleUpdate = async (id, payload) => {
    await updateTodo(id, payload);
    load();
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      load();
    } catch (err) {
      console.error("Delete failed", err);
      if (err?.response?.status === 401) {
        navigate("/signin");
      } else if (err.message === "Token expired") {
        navigate("/signin");
      } else {
        alert(err.response?.data?.message || err.message || "Delete failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <TopBar onCreate={handleCreate} />
            <div>
              {auth.user ? (
                <>
                  <span className="mr-3">{auth.user.name}</span>
                  <button
                    className="ml-2 px-3 py-1 bg-gray-200 rounded"
                    onClick={auth.signout}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-3 py-1 bg-blue-600 text-white rounded mr-2"
                  >
                    Sign in
                  </Link>
                  <Link to="/signup" className="px-3 py-1 bg-gray-200 rounded">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="p-4">
            <Filters
              filter={filter}
              setFilter={setFilter}
              // Contant={CurrentContant}
              // setContant = {setCurrentContant}
            />
          </div>
          <div className="p-4">
            <TaskList
              todos={todos}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        </div>
        <div className="border-t p-4">
          <Stats stats={stats} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
