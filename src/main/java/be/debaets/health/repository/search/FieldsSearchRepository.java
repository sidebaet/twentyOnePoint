package be.debaets.health.repository.search;

import be.debaets.health.domain.Fields;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Fields entity.
 */
public interface FieldsSearchRepository extends ElasticsearchRepository<Fields, Long> {
}
