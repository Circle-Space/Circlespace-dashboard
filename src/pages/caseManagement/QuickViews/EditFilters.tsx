import React, { useState, useCallback, useEffect } from 'react';
import { Form, Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PlusCircle, Layers, X, Plus } from 'react-bootstrap-icons';
import QuickViewBase from '../../../components/QuickViewBase';
import { FilterGroup, FilterCondition, FilterColumn } from '../../../types/editFilter';

interface Props {
  show: boolean;
  onClose: () => void;
  onApply: (filters: FilterCondition[]) => void;
  columns: FilterColumn[];
}

const IconButton: React.FC<{
  icon: React.ReactNode;
  onClick: () => void;
  tooltip: string;
  variant?: string;
}> = ({ icon, onClick, tooltip, variant = 'outline-secondary' }) => (
  <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-${tooltip.replace(/\s+/g, '-')}`}>{tooltip}</Tooltip>}>
    <Button variant={variant} size="sm" onClick={onClick} className="me-1">
      {icon}
    </Button>
  </OverlayTrigger>
);

const FilterNode: React.FC<{
  node: FilterCondition | FilterGroup;
  onUpdate: (updatedNode: FilterCondition | FilterGroup) => void;
  onRemove: () => void;
  columns: FilterColumn[];
  level: number;
}> = ({ node, onUpdate, onRemove, columns, level }) => {
  if ('type' in node) {
    // Render FilterGroup
    return (
      <Card className="mb-2">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Select
              value={node.type}
              onChange={e => onUpdate({ ...node, type: e.target.value as 'AND' | 'OR' })}
              className="me-2"
              style={{ width: 'auto' }}
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </Form.Select>
            <div>
              <IconButton
                icon={<PlusCircle />}
                onClick={() =>
                  onUpdate({
                    ...node,
                    children: [...node.children, { columnName: '', columnCondition: '', columnValue: '' }],
                  })
                }
                tooltip="Add Condition"
              />
              <IconButton
                icon={<Layers />}
                onClick={() =>
                  onUpdate({
                    ...node,
                    children: [...node.children, { type: 'AND', children: [] }],
                  })
                }
                tooltip="Add Group"
              />
              {level > 0 && <IconButton icon={<X />} onClick={onRemove} tooltip="Remove Group" variant="outline-danger" />}
            </div>
          </div>
          {node.children.map((child, index) => (
            <FilterNode
              key={index}
              node={child}
              onUpdate={updatedChild => {
                const newChildren = [...node.children];
                newChildren[index] = updatedChild;
                onUpdate({ ...node, children: newChildren });
              }}
              onRemove={() => {
                const newChildren = node.children.filter((_, i) => i !== index);
                onUpdate({ ...node, children: newChildren });
              }}
              columns={columns}
              level={level + 1}
            />
          ))}
        </Card.Body>
      </Card>
    );
  } else {
    // Render FilterCondition
    const column = columns.find(c => c.name === node.columnName);
    return (
      <Card className="mb-2">
        <Card.Body>
          <div className="d-flex align-items-center">
            <Form.Select value={node.columnName} onChange={e => onUpdate({ ...node, columnName: e.target.value })} className="me-2">
              <option value="">Select Column</option>
              {columns.map(col => (
                <option key={col.name} value={col.name}>
                  {col.name}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              value={node.columnCondition}
              onChange={e => onUpdate({ ...node, columnCondition: e.target.value })}
              className="me-2"
            >
              <option value="">Select Condition</option>
              {column?.conditions.map(cond => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </Form.Select>
            <Form.Control
              type="text"
              value={node.columnValue}
              onChange={e => onUpdate({ ...node, columnValue: e.target.value })}
              placeholder="Enter value"
              className="me-2"
            />
            <IconButton icon={<X />} onClick={onRemove} tooltip="Remove Condition" variant="outline-danger" />
          </div>
        </Card.Body>
      </Card>
    );
  }
};

const EditFilter: React.FC<Props> = ({ show, onClose, onApply, columns }) => {
  const [rootFilter, setRootFilter] = useState<FilterGroup>({ type: 'AND', children: [] });

  useEffect(() => {
    if (show) {
      setRootFilter({ type: 'AND', children: [] });
    }
  }, [show]);

  const handleApply = useCallback(() => {
    const flattenFilters = (node: FilterCondition | FilterGroup): FilterCondition[] => {
      if ('type' in node) {
        return node.children.flatMap(flattenFilters);
      } else {
        return [node];
      }
    };
    const filters = flattenFilters(rootFilter);
    onApply(filters);
    setRootFilter({ type: 'AND', children: [] });
  }, [rootFilter, onApply]);

  const handleClose = useCallback(() => {
    setRootFilter({ type: 'AND', children: [] });
    onClose();
  }, [onClose]);

  const footerButtons = [
    { label: 'Cancel', onClick: handleClose, variant: 'secondary' },
    { label: 'Apply', onClick: handleApply, variant: 'primary' },
  ];

  return (
    <QuickViewBase show={show} onClose={handleClose} title="Edit filters: Cases" footerButtons={footerButtons}>
      <FilterNode node={rootFilter} onUpdate={setRootFilter} onRemove={() => {}} columns={columns} level={0} />
      <div className="mt-3">
        <IconButton
          icon={<PlusCircle />}
          onClick={() =>
            setRootFilter({
              ...rootFilter,
              children: [...rootFilter.children, { columnName: '', columnCondition: '', columnValue: '' }],
            })
          }
          tooltip="Add Condition"
        />
        <IconButton
          icon={<Layers />}
          onClick={() =>
            setRootFilter({
              ...rootFilter,
              children: [...rootFilter.children, { type: 'AND', children: [] }],
            })
          }
          tooltip="Add Group"
        />
      </div>
    </QuickViewBase>
  );
};

export default EditFilter;
