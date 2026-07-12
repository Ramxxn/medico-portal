import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaTrash } from "react-icons/fa";

const ContactUsList = () => {
  const {
    adminToken,
    contactUsList,
    getContactUsRequest,
    updateContactStatus,
    deleteContactRequest,
  } = useContext(AdminContext);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!adminToken) return;
      
      setLoading(true);

      await getContactUsRequest();
      setLoading(false);
    };

    fetchData();
  }, [adminToken]);

  const filteredData = contactUsList.filter((item) =>
    `${item.name} ${item.email} ${item.phone} ${item.subject} ${item.message}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 bg-bg-page min-h-screen">

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-tx-1">
            Contact Us Requests
          </h1>

          <p className="text-sm text-tx-4 mt-1">
            Manage all contact enquiries
          </p>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="input w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card overflow-hidden">

        {loading ? (

          <div className="p-12 text-center">
            Loading...
          </div>

        ) : filteredData.length === 0 ? (

          <div className="p-12 text-center text-tx-4">
            No Contact Requests Found
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-bg-card border-b border-border">

                <tr className="text-left text-sm text-tx-4">

                  <th className="p-4">#</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-center">Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredData.map((item, index) => (

                  <tr
                    key={item._id}
                    className="border-b border-border hover:bg-bg-card transition"
                  >

                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4 font-medium">
                      {item.name}
                    </td>

                    <td className="p-4">
                      {item.email}
                    </td>

                    <td className="p-4">
                      {item.phone || "-"}
                    </td>

                    <td className="p-4">
                      {item.subject || "-"}
                    </td>

                    <td className="p-4 capitalize">
                      {item.type}
                    </td>

                    <td className="p-4 max-w-xs">
                      <p className="line-clamp-2">
                        {item.message}
                      </p>
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                                                ${item.status === "new"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "read"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "replied"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-700"
                          }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="p-4">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                      <select
                        className="input py-2 text-sm"
                        value={item.status}
                        onChange={(e) =>
                          updateContactStatus(
                            item._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="new">
                          New
                        </option>

                        <option value="read">
                          Read
                        </option>

                        <option value="replied">
                          Replied
                        </option>

                        <option value="closed">
                          Closed
                        </option>
                      </select>

                      <button
                        className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                        onClick={() => {

                          if (
                            window.confirm(
                              "Delete this request?"
                            )
                          ) {
                            deleteContactRequest(
                              item._id
                            );
                          }

                        }}
                      >
                        <FaTrash size={14} />
                      </button>

                    </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default ContactUsList;