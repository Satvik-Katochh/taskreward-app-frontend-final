import React from "react";
import ListPoAgGrid from "../../components/PO/ListPoAgGrid";

const ListPO = () => {
  return (
    <div className="container mt-4">
      {/* Breadcrumb and Add PO Button */}
      <div className="row mb-4 align-items-center mx-2">
        <div className="col">
          <div className="d-flex align-items-center">
            <h2 className="mb-0 mr-3">
              <i className="fas fa-list"></i> List PO
            </h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 bg-transparent p-0">
                <li className="breadcrumb-item">
                  <a href="/" className="text-decoration-none">
                    <i className="fas fa-home"></i> Home
                  </a>
                </li>
                <li className="breadcrumb-item active">List PO</li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i> Add PO
          </button>
        </div>
      </div>

      {/* List PO Table */}
      <div style={{ height: 500 }} className="ag-theme-quartz mx-2">
        <ListPoAgGrid />
      </div>
    </div>
  );
};

export default ListPO;

//code with export without card

// import React from "react";
// import ListPoAgGrid from "../../components/PO/ListPoAgGrid";

// const ListPO = () => {
//   return (
//     <div className="container mt-4">
//       {/* Breadcrumb and Add PO Button */}
//       <div className="row mb-4 align-items-center mx-2">
//         <div className="col">
//           <div className="d-flex align-items-center">
//             <h2 className="mb-0 mr-3">
//               <i className="fas fa-list"></i> List PO
//             </h2>
//             <nav aria-label="breadcrumb">
//               <ol className="breadcrumb mb-0 bg-transparent p-0">
//                 <li className="breadcrumb-item">
//                   <a href="/" className="text-decoration-none">
//                     <i className="fas fa-home"></i> Home
//                   </a>
//                 </li>
//                 <li className="breadcrumb-item active">List PO</li>
//               </ol>
//             </nav>
//           </div>
//         </div>
//         <div className="col-auto">
//           <button className="btn btn-primary">
//             <i className="fas fa-plus"></i> Add PO
//           </button>
//         </div>
//       </div>

//       {/* Export Button Above AG Grid */}
//       <div className="row mb-4 align-items-center mx-2">
//         <div className="col-auto ml-auto"> {/* Aligns the button to the right */}
//           <button className="btn btn-outline-secondary">
//             <i className="fas fa-download"></i> Export
//           </button>
//         </div>
//       </div>

//       {/* List PO Table */}
//       <div className="card mx-2">
//         <div className="card-body p-0">
//           <ListPoAgGrid />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListPO;
