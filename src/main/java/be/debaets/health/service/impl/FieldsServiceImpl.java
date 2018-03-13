package be.debaets.health.service.impl;

import be.debaets.health.service.FieldsService;
import be.debaets.health.domain.Fields;
import be.debaets.health.repository.FieldsRepository;
import be.debaets.health.repository.search.FieldsSearchRepository;
import be.debaets.health.service.dto.FieldsDTO;
import be.debaets.health.service.mapper.FieldsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Fields.
 */
@Service
@Transactional
public class FieldsServiceImpl implements FieldsService {

    private final Logger log = LoggerFactory.getLogger(FieldsServiceImpl.class);

    private final FieldsRepository fieldsRepository;

    private final FieldsMapper fieldsMapper;

    private final FieldsSearchRepository fieldsSearchRepository;

    public FieldsServiceImpl(FieldsRepository fieldsRepository, FieldsMapper fieldsMapper, FieldsSearchRepository fieldsSearchRepository) {
        this.fieldsRepository = fieldsRepository;
        this.fieldsMapper = fieldsMapper;
        this.fieldsSearchRepository = fieldsSearchRepository;
    }

    /**
     * Save a fields.
     *
     * @param fieldsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FieldsDTO save(FieldsDTO fieldsDTO) {
        log.debug("Request to save Fields : {}", fieldsDTO);
        Fields fields = fieldsMapper.toEntity(fieldsDTO);
        fields = fieldsRepository.save(fields);
        FieldsDTO result = fieldsMapper.toDto(fields);
        fieldsSearchRepository.save(fields);
        return result;
    }

    /**
     * Get all the fields.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FieldsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Fields");
        return fieldsRepository.findAll(pageable)
            .map(fieldsMapper::toDto);
    }

    /**
     * Get one fields by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FieldsDTO findOne(Long id) {
        log.debug("Request to get Fields : {}", id);
        Fields fields = fieldsRepository.findOne(id);
        return fieldsMapper.toDto(fields);
    }

    /**
     * Delete the fields by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Fields : {}", id);
        fieldsRepository.delete(id);
        fieldsSearchRepository.delete(id);
    }

    /**
     * Search for the fields corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FieldsDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Fields for query {}", query);
        Page<Fields> result = fieldsSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(fieldsMapper::toDto);
    }
}
