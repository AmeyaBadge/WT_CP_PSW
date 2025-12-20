"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  User,
  Users,
  GripVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Type definition for hierarchy node
export interface HierarchyNode {
  title: string;
  name: string;
  children?: HierarchyNode[];
}

interface HierarchyEditorProps {
  value: HierarchyNode[];
  onChange: (hierarchy: HierarchyNode[]) => void;
}

interface NodeEditorProps {
  node: HierarchyNode;
  onUpdate: (node: HierarchyNode) => void;
  onDelete: () => void;
  onAddChild: () => void;
  level: number;
}

const NodeEditor = ({
  node,
  onUpdate,
  onDelete,
  onAddChild,
  level,
}: NodeEditorProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const updateChild = (index: number, updatedChild: HierarchyNode) => {
    const newChildren = [...(node.children || [])];
    newChildren[index] = updatedChild;
    onUpdate({ ...node, children: newChildren });
  };

  const deleteChild = (index: number) => {
    const newChildren = (node.children || []).filter((_, i) => i !== index);
    onUpdate({ ...node, children: newChildren });
  };

  const addChildToChild = (index: number) => {
    const newChildren = [...(node.children || [])];
    newChildren[index] = {
      ...newChildren[index],
      children: [
        ...(newChildren[index].children || []),
        { title: "", name: "", children: [] },
      ],
    };
    onUpdate({ ...node, children: newChildren });
  };

  return (
    <div className={cn("relative", level > 0 && "ml-6 border-l-2 border-gray-200 pl-4")}>
      <Card className={cn(
        "mb-3",
        level === 0 ? "border-govt-blue/30 bg-govt-blue/5" : "border-gray-200"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Drag Handle & Expand */}
            <div className="flex flex-col items-center gap-1 pt-2">
              <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
              {hasChildren && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>

            {/* Icon */}
            <div className={cn(
              "p-2 rounded-full shrink-0 mt-1",
              level === 0 ? "bg-govt-blue/10" : "bg-gray-100"
            )}>
              {hasChildren ? (
                <Users className={cn("h-5 w-5", level === 0 ? "text-govt-blue" : "text-gray-500")} />
              ) : (
                <User className={cn("h-5 w-5", level === 0 ? "text-govt-blue" : "text-gray-500")} />
              )}
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500">Name / नाव</Label>
                  <Input
                    value={node.name}
                    onChange={(e) => onUpdate({ ...node, name: e.target.value })}
                    placeholder="e.g., श्री. विजयकुमार परीट"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Title/Position / पद</Label>
                  <Input
                    value={node.title}
                    onChange={(e) => onUpdate({ ...node, title: e.target.value })}
                    placeholder="e.g., गटविकास अधिकारी"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onAddChild}
                  className="text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Subordinate
                </Button>
                {level > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onDelete}
                    className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-2">
          {node.children!.map((child, index) => (
            <NodeEditor
              key={index}
              node={child}
              onUpdate={(updated) => updateChild(index, updated)}
              onDelete={() => deleteChild(index)}
              onAddChild={() => addChildToChild(index)}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HierarchyEditor = ({ value, onChange }: HierarchyEditorProps) => {
  const addRootNode = () => {
    onChange([...value, { title: "", name: "", children: [] }]);
  };

  const updateNode = (index: number, updatedNode: HierarchyNode) => {
    const newHierarchy = [...value];
    newHierarchy[index] = updatedNode;
    onChange(newHierarchy);
  };

  const deleteNode = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const addChildToNode = (index: number) => {
    const newHierarchy = [...value];
    newHierarchy[index] = {
      ...newHierarchy[index],
      children: [
        ...(newHierarchy[index].children || []),
        { title: "", name: "", children: [] },
      ],
    };
    onChange(newHierarchy);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Department Hierarchy</h3>
          <p className="text-sm text-gray-500">
            Add staff members and their positions in the department hierarchy
          </p>
        </div>
        {value.length === 0 && (
          <Button type="button" onClick={addRootNode} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Department Head
          </Button>
        )}
      </div>

      {value.length > 0 ? (
        <div className="space-y-2">
          {value.map((node, index) => (
            <NodeEditor
              key={index}
              node={node}
              onUpdate={(updated) => updateNode(index, updated)}
              onDelete={() => deleteNode(index)}
              onAddChild={() => addChildToNode(index)}
              level={0}
            />
          ))}
          
          <Button
            type="button"
            onClick={addRootNode}
            variant="ghost"
            className="w-full border-2 border-dashed border-gray-300 hover:border-govt-blue/50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Department Head
          </Button>
        </div>
      ) : (
        <Card className="p-8 text-center border-dashed">
          <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">No hierarchy defined yet</p>
          <Button type="button" onClick={addRootNode}>
            <Plus className="h-4 w-4 mr-2" />
            Add Department Head
          </Button>
        </Card>
      )}
    </div>
  );
};

export default HierarchyEditor;
