package be.debaets.health.service.mapper;

import be.debaets.health.domain.*;
import be.debaets.health.service.dto.PointsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Points and its DTO PointsDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface PointsMapper extends EntityMapper<PointsDTO, Points> {

    @Mapping(source = "user.id", target = "userId")
    PointsDTO toDto(Points points);

    @Mapping(source = "userId", target = "user")
    Points toEntity(PointsDTO pointsDTO);

    default Points fromId(Long id) {
        if (id == null) {
            return null;
        }
        Points points = new Points();
        points.setId(id);
        return points;
    }
}
