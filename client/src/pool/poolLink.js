import React, { useRef } from "react";
import { Icon, Input, Button } from "semantic-ui-react";

function PoolLink({ link }) {
  const linkRef = useRef();

  function copyLink() {
    linkRef.current.select();
    document.execCommand("copy");
  }
  return (
    <div>
      <Input
        ref={linkRef}
        style={{ marginTop: "0.5em", marginBottom: "0.7em" }}
        label={
          <Button color="teal" icon={<Icon name="copy" />} onClick={copyLink} />
        }
        labelPosition="right"
        placeholder="Find domain"
        value={link}
      />
    </div>
  );
}

export default PoolLink;
