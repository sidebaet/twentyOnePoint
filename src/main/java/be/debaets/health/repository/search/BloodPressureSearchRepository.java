package be.debaets.health.repository.search;

import be.debaets.health.domain.BloodPressure;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the BloodPressure entity.
 */
public interface BloodPressureSearchRepository extends ElasticsearchRepository<BloodPressure, Long> {
}
