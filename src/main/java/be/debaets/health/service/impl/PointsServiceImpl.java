package be.debaets.health.service.impl;

import be.debaets.health.service.PointsService;
import be.debaets.health.domain.Points;
import be.debaets.health.repository.PointsRepository;
import be.debaets.health.repository.search.PointsSearchRepository;
import be.debaets.health.service.dto.PointsDTO;
import be.debaets.health.service.mapper.PointsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Points.
 */
@Service
@Transactional
public class PointsServiceImpl implements PointsService {

    private final Logger log = LoggerFactory.getLogger(PointsServiceImpl.class);

    private final PointsRepository pointsRepository;

    private final PointsMapper pointsMapper;

    private final PointsSearchRepository pointsSearchRepository;

    public PointsServiceImpl(PointsRepository pointsRepository, PointsMapper pointsMapper, PointsSearchRepository pointsSearchRepository) {
        this.pointsRepository = pointsRepository;
        this.pointsMapper = pointsMapper;
        this.pointsSearchRepository = pointsSearchRepository;
    }

    /**
     * Save a points.
     *
     * @param pointsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PointsDTO save(PointsDTO pointsDTO) {
        log.debug("Request to save Points : {}", pointsDTO);
        Points points = pointsMapper.toEntity(pointsDTO);
        points = pointsRepository.save(points);
        PointsDTO result = pointsMapper.toDto(points);
        pointsSearchRepository.save(points);
        return result;
    }

    /**
     * Get all the points.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PointsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Points");
        return pointsRepository.findAll(pageable)
            .map(pointsMapper::toDto);
    }

    /**
     * Get one points by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PointsDTO findOne(Long id) {
        log.debug("Request to get Points : {}", id);
        Points points = pointsRepository.findOne(id);
        return pointsMapper.toDto(points);
    }

    /**
     * Delete the points by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Points : {}", id);
        pointsRepository.delete(id);
        pointsSearchRepository.delete(id);
    }

    /**
     * Search for the points corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PointsDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Points for query {}", query);
        Page<Points> result = pointsSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(pointsMapper::toDto);
    }
}
