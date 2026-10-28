---
title: "Actuator"
summary: "执行组件"
date: "2026-03-01"
draft: false
tags:
- C++11
repoUrl: https://github.com/20040122/Actuator_final
---

Actuator_final 是一个基于 C++ 开发的多卫星协同任务执行与仿真系统，采用 Coordinator 统一负责多节点任务调度、消息通信和状态管理，各卫星节点通过 SatelliteSimulator 与 GenericExecutor 执行具体任务，并利用 JSON 配置的行为树动态描述任务逻辑，实现任务分发、行为执行、状态反馈以及多节点协同等功能。项目采用 CMake 构建，并结合 Socket 通信、多线程、消息队列和行为树等机制，整体体现了“调度计划—协调器—卫星节点—行为树执行器—状态反馈”的分布式任务执行架构。