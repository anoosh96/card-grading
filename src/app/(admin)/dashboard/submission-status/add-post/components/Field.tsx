// interface FieldProps {
//   label: string;
//   field: keyof FormData;
//   value: string;
//   editable?: boolean;
//   onChange?: (field: keyof FormData, value: string) => void;
//   isEditing: boolean;
// }

// const Field = ({
//   label,
//   field,
//   value,
//   editable = true,
//   onChange,
//   isEditing,
// }: FieldProps) => {
//   const shouldUseTextarea = ["condition"].includes(field);

//   return (
//     <div className="grid grid-cols-2 py-2">
//       <span className="text-gray-600">{label}</span>
//       <div className="flex items-center justify-between w-full">
//         {isEditing && editable ? (
//           shouldUseTextarea ? (
//             <textarea
//               value={value}
//               onChange={(e) => onChange?.(field, e.target.value)}
//               className="border border-gray-300 rounded px-2 py-1 w-full min-h-[60px] resize-y"
//               rows={2}
//             />
//           ) : (
//             <input
//               type="text"
//               value={value}
//               onChange={(e) => onChange?.(field, e.target.value)}
//               className="border border-gray-300 rounded px-2 py-1 w-full"
//             />
//           )
//         ) : (
//           <span
//             className={
//               field === "status"
//                 ? "text-orange-500 font-medium"
//                 : "text-gray-900"
//             }
//           >
//             {value}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Field;
