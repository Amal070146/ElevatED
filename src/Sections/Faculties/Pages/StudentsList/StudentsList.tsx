import { useEffect, useState } from 'react';
import useTableState from '../../../../Components/Table/services/hooks/useTableState';
import styles from './StudentsList.module.css'
import Table from '../../../../Components/Table/Table';
import { EditSvg, ClickSvg, DeleteSvg } from './assets/svg';
import { StoreOwnerColumn } from './services/studentColumn';
import StudentEditModal from './services/studentEditModal';
import { getStudentData } from './services/studentApi';
type Props = {}

export const StudentsList = (_props: Props) => {
 const tableState = useTableState<StudentColumnData>();
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [item, setItem] = useState<StudentColumnData>();

 useEffect(() => {
   tableState.handleFetchData(() =>
     getStudentData(
       tableState.rowsPerPage,
       tableState.currentPage,
       tableState.searchTerm,
       tableState.sortColumn
     )
   );
 }, [
   tableState.currentPage,
   tableState.rowsPerPage,
   tableState.searchTerm,
   tableState.sortColumn,
 ]);

 function handleClick(item: StudentColumnData): void {
   console.log(item);
 }

 const handleEditClick = (item: StudentColumnData) => {
   setItem(item);
   setIsEditModalOpen(!isEditModalOpen);
 };

 return (
   <div className={styles.Wrapper}>
     storeOwners
     <Table<StudentColumnData>
       keyColumn={"id"}
       columns={StoreOwnerColumn}
       tableState={tableState}
       onRowClick={handleClick}
       actions={[
         {
           icon: <EditSvg />,
           onClick: (item) => {
             handleEditClick(item);
           },
           title: "View Details",
         },
         {
           icon: <ClickSvg />,
           onClick: (item) => {
             handleClick(item);
           },
           title: "View Details",
         },
         {
           icon: <DeleteSvg />,
           onClick: (item) => {
             handleClick(item);
           },
           title: "View Details",
         },
       ]}
     />
     <StudentEditModal
       isOpen={isEditModalOpen}
       onClose={() => setIsEditModalOpen(false)}
       item={item}
     />
   </div>
 );
}