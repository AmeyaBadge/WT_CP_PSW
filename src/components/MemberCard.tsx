import Image from "next/image";

type Member = {
  image: string;
  name: string;
  position: string;
  department: string;
};

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4">
        <div className="relative h-48 mb-4">
          <Image
            src={member.image}
            alt={`Photo of ${member.name}`}
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-bold text-govt-blue mb-1">{member.name}</h3>
        <p className="text-gray-600 mb-2">{member.position}</p>
        <p className="text-sm text-gray-500 mb-3">{member.department}</p>
        {/* <div className="flex items-center text-sm">
          <svg
            className="w-4 h-4 mr-2 text-govt-saffron"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>{member.phone}</span>
        </div> */}
      </div>
    </div>
  );
};

export default MemberCard;
