package com.noyex.data.repository;

import com.noyex.data.model.NoteFolder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteFolderRepository extends JpaRepository<NoteFolder, Long> {
}
