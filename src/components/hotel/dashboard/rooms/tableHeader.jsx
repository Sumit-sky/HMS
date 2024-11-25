export default function TableHeader({ headers }) {
    return (
      <thead className="bg-gray-100  text-gray-700">
        <tr>
          {headers.map((item,index) => (
            <th key={index} className="py-3 font-normal px-4 text-left">{item}</th>
          ))}
        </tr>
      </thead>
    );
  }
  