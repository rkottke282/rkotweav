import React from 'react'
import { useParams } from 'react-router-dom';
import { SortableList } from './components/sortable-list';

const List: React.FC = () => {
    const { suffix } = useParams<{ suffix: string }>();

    return (
        <div 
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center'

            }}>
            <div style={{ maxWidth: '80% ', width: '100%', textAlign: 'center', gap: '4rem', marginTop: '2rem'}} className="flex flex-col items-center">
                <h1 className={`mb-3 text-4xl font-semibold`}>List: {suffix}</h1>
                <SortableList></SortableList>
            </div>
        </div>
        
    );
}

export default List;