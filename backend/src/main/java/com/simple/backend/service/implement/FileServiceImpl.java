package com.simple.backend.service.implement;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;
import com.simple.backend.service.FileService;

@Service
public class FileServiceImpl implements FileService {

    @Value("${file.path}")
    private String filePath; // 저장될 위치의 경로
    @Value("${file.url}")
    private String fileUrl;

    @Override
    public String upload(MultipartFile file) {
        System.out.println("MultipartFile file: " + file.isEmpty() + " " + file.getName());
        if (file.isEmpty())
            return null;
        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));

        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid + extension;
        System.out.println("file uuid : " + uuid);

        String savePath = filePath + saveFileName;
        System.out.println("savePath : " + savePath);
        try {
            // File f = new File(savePath);
            // System.out.println("f.exists() : " + f.exists() + " " + f.mkdirs() + " " +
            // f.getPath());
            file.transferTo(new File(savePath)); // 지정 경로에 파일 저장
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        String url = fileUrl + saveFileName;
        return url;
    }

    @Override
    public Resource getImage(String fileName) {

        Resource resource = null;
        try {
            resource = new UrlResource("file:" + filePath + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return resource;
    }

}
