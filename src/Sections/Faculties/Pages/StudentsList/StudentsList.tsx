import { useEffect, useState } from 'react';
import useTableState from '../../../../Components/Table/services/hooks/useTableState';
import styles from './StudentsList.module.css'
import Table from '../../../../Components/Table/Table';
import { EditSvg } from './assets/svg';
import { StoreOwnerColumn } from './services/studentColumn';
import StudentEditModal from './services/studentEditModal';
import { getStudentData } from './services/studentApi';

type Props = {}

export const StudentsList = (_props: Props) => {
 const tableState = useTableState<UserInfo>();
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [item, setItem] = useState<UserInfo>();

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

 function handleClick(item: UserInfo): void {
   console.log(item);
 }

 const handleEditClick = (item: UserInfo) => {
   setItem(item);
   setIsEditModalOpen(!isEditModalOpen);
 };

 return (
   <div className={styles.Wrapper}>
     <h3>STUDENTS LIST</h3>
     <Table<UserInfo>
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