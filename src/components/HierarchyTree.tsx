"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Type definition for hierarchy node
interface HierarchyNode {
  title: string;
  name: string;
  children?: HierarchyNode[];
}

interface HierarchyTreeProps {
  hierarchy: HierarchyNode[];
  className?: string;
}

interface TreeNodeProps {
  node: HierarchyNode;
  level: number;
  isLast: boolean;
}

const TreeNode = ({ node, level, isLast }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      {/* Vertical line connecting to parent */}
      {level > 0 && (
        <div
          className={cn(
            "absolute left-0 w-px bg-govt-blue/20",
            isLast ? "h-6" : "h-full"
          )}
          style={{ left: `${(level - 1) * 24 + 12}px`, top: "-12px" }}
        />
      )}

      {/* Horizontal line from vertical line to node */}
      {level > 0 && (
        <div
          className="absolute h-px bg-govt-blue/20"
          style={{
            left: `${(level - 1) * 24 + 12}px`,
            top: "18px",
            width: "12px",
          }}
        />
      )}

      <div
        className={cn("flex items-start gap-2", level > 0 && "ml-6")}
        style={{ marginLeft: level > 0 ? `${level * 24}px` : "0" }}
      >
        {/* Expand/Collapse Button or User Icon */}
        <div className="flex-shrink-0 mt-1">
          {hasChildren ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-govt-blue/10 rounded-md transition-colors"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-govt-blue" />
              ) : (
                <ChevronRight className="h-4 w-4 text-govt-blue" />
              )}
            </button>
          ) : (
            <div className="p-1">
              <User className="h-4 w-4 text-gray-400" />
            </div>
          )}
        </div>

        {/* Node Content */}
        <div
          className={cn(
            "flex-1 p-3 rounded-lg border transition-all",
            level === 0
              ? "bg-govt-blue/5 border-govt-blue/20 shadow-sm"
              : "bg-white border-gray-200 hover:border-govt-blue/30 hover:shadow-sm"
          )}
        >
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex-shrink-0 p-2 rounded-full",
                level === 0 ? "bg-govt-blue/10" : "bg-gray-100"
              )}
            >
              {hasChildren ? (
                <Users
                  className={cn(
                    "h-5 w-5",
                    level === 0 ? "text-govt-blue" : "text-gray-500"
                  )}
                />
              ) : (
                <User
                  className={cn(
                    "h-5 w-5",
                    level === 0 ? "text-govt-blue" : "text-gray-500"
                  )}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "font-semibold truncate",
                  level === 0 ? "text-govt-blue" : "text-gray-900"
                )}
              >
                {node.name}
              </p>
              <p className="text-sm text-gray-500">{node.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative mt-2">
          {node.children!.map((child, index) => (
            <div key={`${child.name}-${index}`} className="mt-2">
              <TreeNode
                node={child}
                level={level + 1}
                isLast={index === node.children!.length - 1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HierarchyTree = ({ hierarchy, className }: HierarchyTreeProps) => {
  if (!hierarchy || hierarchy.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {hierarchy.map((node, index) => (
        <TreeNode
          key={`${node.name}-${index}`}
          node={node}
          level={0}
          isLast={index === hierarchy.length - 1}
        />
      ))}
    </div>
  );
};

export default HierarchyTree;

// Export types for use in other components
export type { HierarchyNode, HierarchyTreeProps };
