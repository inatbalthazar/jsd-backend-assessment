import Table from "../Table";

const Display = ({
  activeSection,
  members,
  handleDelete,
  handleCreate,
  handleUpdate,
  formData,
  setFormData,
}) => {
  return (
    <div className="w-full max-w-5xl mt-6 p-8 bg-white rounded-lg border border-[#dadce0]">
      {!activeSection && (
        <p className="text-center text-xl text-base text-[#9aa0a6] italic py-8">
          {`Choose a section`}
        </p>
      )}
      {activeSection === "user" && (
        <div>
          <h2 className="text-xl font-medium text-[#202124] mb-5">
            User Database
          </h2>
          <Table data={members} isAdmin={false} />
        </div>
      )}
      {activeSection === "admin" && (
        <div>
          <h2 className="text-xl font-medium text-[#202124] mb-5">
            Admin Control Panel
          </h2>
          <div className="mb-6 p-5 bg-[#f8f9fa] rounded-lg border border-[#e8eaed]">
            <h3 className="text-sm font-medium mb-4 text-[#5f6368]">
              Create New Product
            </h3>
            <form onSubmit={handleCreate} className="flex gap-3 items-end flex-wrap">
              <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
                <label className="text-xs font-medium text-[#5f6368]">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-[#dadce0] bg-white px-3 py-2 rounded text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
                <label className="text-xs font-medium text-[#5f6368]">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  className="border border-[#dadce0] bg-white px-3 py-2 rounded text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
                <label className="text-xs font-medium text-[#5f6368]">Quantity</label>
                <input
                  type="number"
                  placeholder="Quantity"
                  className="border border-[#dadce0] bg-white px-3 py-2 rounded text-sm text-[#202124] outline-none focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] transition-all"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#1a73e8] text-white px-6 py-2 rounded text-sm font-medium hover:bg-[#1557b0] hover:shadow-md transition-all h-[40px]"
              >
                Save
              </button>
            </form>
          </div>
          <Table data={members} isAdmin={true} onDelete={handleDelete} onUpdate={handleUpdate} />
        </div>
      )}
    </div>
  );
};

export default Display;
