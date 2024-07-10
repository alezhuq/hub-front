import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function useDragAndDrop() {
  const [dragOver, setDragOver] = useState(false);
  const [fileDropError, setFileDropError] = useState("");

  const onDragOver = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  return {
    dragOver,
    setDragOver,
    onDragOver,
    onDragLeave,
    fileDropError,
    setFileDropError,
  };
}

const Body = styled.div<{
  preview: string | undefined;
  dragOver: boolean;
  height: string;
  width: string;
}>`
  ${(props) => `
    height: ${props.height};
    width: ${props.width};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    position: relative;
    overflow: hidden;
    cursor: ${props.preview ? "default" : "pointer"};
    background: #FFFFFF;
    border: ${
      props.dragOver
        ? `1px dashed #38D673`
        : props.preview
        ? `1px solid #EFEEF1`
        : `1px dashed #9ACBFF`
    };

    @media (hover: hover){
      &:hover{
        border: ${
          props.dragOver
            ? `1px dashed #38D673`
            : props.preview
            ? `1px solid #EFEEF1`
            : `1px dashed #1787FF`
        };
      }
    }
   
    @media (hover: none){
      & {
        border: ${
          props.dragOver
            ? `1px dashed #38D673`
            : props.preview
            ? `1px solid #EFEEF1`
            : `1px dashed #1787FF`
        };
      }
    }
  `}

  .image {
    object-fit: cover;
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: #ffffff;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 8px;
  right: 8px;
  outline: none;
  border: none;
  z-index: 10;
  cursor: pointer;
`;

type UploadPhoto = {
  text: string;
  name: string;
  height?: number;
  width?: number;
  onFileSet: (name: string, file: File) => void;
  onFileDelete: (name: string) => void;
};

const UploadPhoto = ({
  text,
  name,
  onFileSet,
  onFileDelete,
  height,
  width,
}: UploadPhoto) => {
  const { dragOver, setDragOver, onDragOver, onDragLeave } = useDragAndDrop();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const onSelectFile = useCallback((e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    if (!e.target.files[0].type.includes("image")) {
      toast.error("This type of file is not supported", {
        style: { fontFamily: "Inter" },
      });
      return;
    }

    setSelectedFile(e.target.files[0]);
  }, []);

  const onDelete = useCallback(
    (e: any) => {
      e.preventDefault();
      setSelectedFile(undefined);
      setPreview(undefined);
      onFileDelete(name);
    },
    [name, onFileDelete]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      setDragOver(false);

      if (!e.dataTransfer.files[0].type.includes("image")) {
        toast.error("This type of file is not supported", {
          style: { fontFamily: "Inter" },
        });
        return;
      }

      return setSelectedFile(e.dataTransfer.files[0]);
    },
    [setDragOver]
  );

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);

    setPreview(objectUrl);
    onFileSet(name, selectedFile);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <label htmlFor={`file-upload-${name}`}>
      <Body
        height={height ? height + "px" : "100%"}
        width={width ? width + "px" : "100%"}
        dragOver={dragOver}
        preview={preview}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <Toaster />
        {!preview && (
          <Content>
            <Typography variant="body1">{text}</Typography>
            <HiddenInput
              type="file"
              name="file"
              id={`file-upload-${name}`}
              onChange={onSelectFile}
            />
            <AddIcon />
          </Content>
        )}

        {selectedFile && preview && (
          <>
            <CloseButton type="button" onClick={onDelete}>
              <CloseIcon />
            </CloseButton>
            <Image src={preview} alt="selectedImg" fill className="image" />
          </>
        )}
      </Body>
    </label>
  );
};

export default UploadPhoto;
