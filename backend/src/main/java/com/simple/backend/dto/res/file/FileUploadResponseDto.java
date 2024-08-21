package com.simple.backend.dto.res.file;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.simple.backend.common.ResponseCode;
import com.simple.backend.common.ResponseMessage;
import com.simple.backend.dto.res.ResponseDto;

public class FileUploadResponseDto extends ResponseDto {

    public FileUploadResponseDto() {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    }

    public static ResponseEntity<ResponseDto> uploadFailed() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseDto(ResponseCode.VALIDATION_FAILED,
                ResponseMessage.VALIDATION_FAILED));
    }

}
