import { useState } from "react";

// components ที่ใช้งานทั้งหมด ที่ตาราง user, admin
const Table = ({ data, isAdmin, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", quantity: 1 });

  const handleStartEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ name: product.name, price: product.price, quantity: product.quantity });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", price: "", quantity: 1 });
  };

  const handleSaveEdit = (id) => {
    if (!editForm.name || editForm.price === "") {
      alert("Please input all fields!");
      return;
    }
    if (onUpdate) {
      onUpdate(id, {
        name: editForm.name,
        price: Number(editForm.price),
        quantity: Number(editForm.quantity),
      });
    }
    setEditingId(null);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-[#dadce0] bg-white">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#dadce0]">
            <th className="py-3 px-4 text-xs font-medium text-[#5f6368] uppercase tracking-wider">Name</th>
            <th className="py-3 px-4 text-xs font-medium text-[#5f6368] uppercase tracking-wider">Price</th>
            <th className="py-3 px-4 text-xs font-medium text-[#5f6368] uppercase tracking-wider">Quantity</th>
            {/* ถ้าเป็น Admin ให้โชว์หัวข้อ Action */}
            {isAdmin && (
              <th className="py-3 px-4 text-xs font-medium text-[#5f6368] uppercase tracking-wider text-center">Action</th>
            )}
          </tr>
        </thead>

        <tbody className="text-sm text-[#202124]">
          {data.length > 0 ? (
            data.map((product) => {
              const isEditing = editingId === product.id;

              return (
                <tr
                  key={product.id}
                  className="border-b border-[#e8eaed] hover:bg-[#f8f9fa] transition-colors"
                >
                  <td className="py-3 px-4 font-medium">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="w-full border border-[#dadce0] bg-white px-3 py-1.5 rounded text-[#202124] text-sm outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all"
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: e.target.value })
                        }
                        className="w-full border border-[#dadce0] bg-white px-3 py-1.5 rounded text-[#202124] text-sm outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all"
                      />
                    ) : (
                      `$${product.price}`
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.quantity}
                        onChange={(e) =>
                          setEditForm({ ...editForm, quantity: e.target.value })
                        }
                        className="w-full border border-[#dadce0] bg-white px-3 py-1.5 rounded text-[#202124] text-sm outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all"
                      />
                    ) : (
                      <span className="text-[#5f6368]">{product.quantity}</span>
                    )}
                  </td>

                  {/* ถ้าเป็น Admin ให้โชว์ปุ่ม Edit และ Delete */}
                  {isAdmin && (
                    <td className="py-3 px-4 text-center">
                      {isEditing ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleSaveEdit(product.id)}
                            className="bg-[#1a73e8] text-white px-4 py-1.5 rounded text-xs font-medium hover:bg-[#1557b0] transition-colors shadow-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-white text-[#5f6368] px-4 py-1.5 rounded text-xs font-medium border border-[#dadce0] hover:bg-[#f1f3f4] transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleStartEdit(product)}
                            className="text-[#1a73e8] bg-white px-4 py-1.5 rounded text-xs font-medium border border-[#dadce0] hover:bg-[#e8f0fe] transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(product.id)}
                            className="text-[#d93025] bg-white px-4 py-1.5 rounded text-xs font-medium border border-[#dadce0] hover:bg-[#fce8e6] transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={isAdmin ? 4 : 3}
                className="py-10 text-center text-[#9aa0a6] italic text-sm"
              >
                {`"Who decided there is no data? I am waiting..."`}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
