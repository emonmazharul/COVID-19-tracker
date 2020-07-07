import React, { useEffect } from 'react';
import { Card } from 'semantic-ui-react';

function SaleNote({note}) {

  useEffect(() => {
    'updating component';
  }, [note]);

  return (
    <div style={{marginTop:'0.5em'}}>
      <Card
        style={{margin:'0 auto'}}
        header={note.shopName}
        description={note.saleNote}
      />
    </div>
  );
}

export default SaleNote;
